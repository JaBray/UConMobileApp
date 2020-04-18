import AsyncStorage from '@react-native-community/async-storage';
import { RSAKeychain  } from 'react-native-rsa-native';
import { getSchedule } from '../functions/get_schedule.js';

// ACCEPTS USERNAME AND PASSWORD AND RETURNS auth_response.json
export async function authenticate(username, password) {

  // REMOVE ANY STORED CREDENTIALS AS WE'LL REPLACE WITH NEW CREDENTIALS IF VALID.
  const keys = ['username', 'password', 'token'];
  await AsyncStorage.multiRemove(keys)
    .catch(error => {
      // TAKE NO ACTION. KEYS WILL BE REPLACED.
    });

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
      return await authResponseValid(response, username, password)
        .then(async auth_response => {
          if (auth_response.members) {
            await storeMemberNames(auth_response.members);
          }
          return auth_response;
        });
    }

    if (response.status === 401) {
      return getErrorMessage('Your credentials were not recognized. Please try again.');
    }
    return getErrorMessage(`Error: ${response.status}. An error occurred during login. Please try again or contact the administrator.`);
  })
  .catch(error => {
    return getErrorMessage(`The authentication server could not be reached. Please try again or contact the administrator. ${error}`);
  });
}


// IF VALID CREDENTIALS, STORE CREDENTIALS, TOKEN AND REDIRECT TO SCHEDULE PAGE.
async function authResponseValid(response, username, password) {
  try {
    const responseObject = await response.json();
    const hash = responseObject.hash;

    const keyTag = await AsyncStorage.getItem('keyTag');
    const encryptedUsername = await RSAKeychain.encrypt(username, keyTag);
    const encryptedPassword = await RSAKeychain.encrypt(password, keyTag);
    await AsyncStorage.setItem('username', encryptedUsername.toString());
    await AsyncStorage.setItem('password', encryptedPassword.toString());

    await AsyncStorage.setItem('token', hash.toString());
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
  try {
    const players_string = JSON.stringify(membersArray);
    await AsyncStorage.setItem('members', players_string);
  } catch (error) {
    throw Error(error);
  }

}

function getErrorMessage(message) {
  return {
    error: true,
    message: message
  };
}
