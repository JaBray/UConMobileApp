import AsyncStorage from '@react-native-community/async-storage';
import { RSA } from 'react-native-rsa-native';
import { getSchedule } from '../functions/get_schedule.js';

// ACCEPTS USERNAME AND PASSWORD AND RETURNS auth_response.json
export async function sendCredentials(username, password) {

  // REMOVE ANY STORED CREDENTIALS AS WE'LL REPLACE WITH NEW CREDENTIALS IF VALID.
  const keys = ['username', 'password', 'token'];
  await AsyncStorage.multiRemove(keys)

  // FETCH PARAMETERS
  const url = 'https://ucon-gaming.org/reg/api/services.php?action=login';
  const body = {
    user: username,
    pass: password
  };

  // WRAP FETCH IN A TIMEOUT (10000 MILLISECONDS)
  return new Promise(function(resolve, reject) {
     const timeout = setTimeout(() => reject(new Error('Request timed out')), 10000);

    // FETCH CALL
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => {
      clearTimeout(timeout);
      resolve(response);
    })
    .catch(error => {
      reject(error);
    }); // END FETCH CALL

  }) // NEXT CALL IN PROMISE
  .then(async response => {
    if (response.ok) {
      return authResponseValid(response, username, password);
    }

    if (response.status === 401) {
      return getErrorMessage('Your credentials were not recognized. Please try again.');
    }
    return getErrorMessage(`Error: ${response.status}. An error occurred during login. Please try again or contact the administrator.`);
  })
  .catch(error => {
    return getErrorMessage('The authentication server could not be reached. Please try again or contact the administrator.');
  });
}


// IF VALID CREDENTIALS, STORE CREDENTIALS, TOKEN AND REDIRECT TO SCHEDULE PAGE.
async function authResponseValid(response, username, password) {
  try {
    const responseObject = await response.json();
    const hash = responseObject.hash;
    const publicKey = await AsyncStorage.getItem('public');
    const encryptedUsername = await RSA.encrypt(username, publicKey);
    const encryptedPassword = await RSA.encrypt(password, publicKey);
    await AsyncStorage.setItem('username', encryptedUsername.toString());
    await AsyncStorage.setItem('password', encryptedPassword.toString());
    await AsyncStorage.setItem('token', hash.toString());
    storeMemberNames(responseObject.members);
    return responseObject;
  } catch (error) {
    return getErrorMessage(`ERROR: The authentication server's response was not understood. Please try again or contact the administrator. ${error}`)
  }
}

// STORES AN ARRAY OF PLAYERS TO USE WHEN DISPLAYING THE MENU
// COULD NOT STORE AN ARRAY OF OBJECTS FOR SOME REASON
// EACH PLAYER IS AN ARRAY OF [ID, NAME]
async function storeMemberNames(members) {
  let membersArray = [];
  for (const member of members) {
    membersArray.push([
        member.id_member,
        `${member.s_fname} ${member.s_lname}`
    ]);
  }

  // FAKE AUTHENTICATION RESPONSE FOR DEVELOPMENT
  membersArray = [
    ['2', 'Jane Doe'],
    ['151', 'Brother Bob']
  ];
  const players_string = JSON.stringify(membersArray);
  await AsyncStorage.setItem('members', players_string);
}

function getErrorMessage(message) {
  return {
    error: true,
    message: message
  };
}
