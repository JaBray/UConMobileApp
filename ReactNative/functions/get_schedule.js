import AsyncStorage from '@react-native-community/async-storage';
import { sendCredentials } from '../functions/authenticate.js';
import { mockSchedule } from '../functions/mockSchedule.js';

export async function getSchedule(firstAttempt = true) {

    // FOR DEVELOPMENT. REMOVE AND CHANGE URL ONCE API IS PUBLISHED
    return parseSchedule(null);

    // FETCH PARAMETERS
    const url = 'https://myfakeapi.com/api/cars/';

    // WRAP FETCH IN A TIMEOUT (5 SECONDS)
    new Promise(function(resolve, reject) {
      const timeout = setTimeout(() => reject(new Error('Request timed out')), 10000);

      // FETCH CALL
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`}
      })
      .then(response => {
        clearTimeout(timeout);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
      // END FETCH

    })
    .then(async response => {
      if (response.ok) {
        return parseSchedule(response);
      } else if (response.status === 401) {
        if (firstAttempt) {

          // TODO: DECRYPT CREDENTIALS BEFORE SENDING
          const encryptedUsername = await AsyncStorage.getItem('username');
          const encryptedPassword = await AsyncStorage.getItem('password');
          const keyTag = await AsyncStorage.getItem('keyTag');
          const username = await RSAKeychain.decrypt(encryptedUsername, keyTag);
          const password = await RSAKeychain.decrypt(encryptedPassword, keyTag);
          
          sendCredentials(username, password);
          return getSchedule(false);
        } else {
          const keys = ['username', 'password', 'token', 'members'];
          await AsyncStorage.multiRemove(keys);
          return getErrorMessage('User is no longer authenticated.');
        }
      } else {
        // COULD BE A 404 OR 500 OR OTHER
          return getErrorMessage(`Error Code: ${response.status}. An error occurred while retrieving your schedule.
            Please contact your administrator or try again later.`);
      }
    })
    .catch(error => {
      return getErrorMessage('I could not react the server to retrieve your schedule. Please contact the administrator or try again later.');
    });
}


// TAKES THE SUCCESSFULL FETCH RESPONSE AND STORES THE KEY/VALUE PAIRS
async function parseSchedule(response) {
  try {

    // FOR DEVELOPMENT ONLY
    responseObject = mockSchedule();

    //responseObject = await response.json();
    for (const member of responseObject.players) {
      const events_string = JSON.stringify(member.events);
      await AsyncStorage.setItem(member.id_member, events_string);
    }

    return {
      error: false,
      message: responseObject.players[0].id_member
    };
  } catch (error) {
    return getErrorMessage(`An error occurred while parsing member schedules. ${error}`);
  }
}

function getErrorMessage(message) {
  return {
    error: true,
    message: message
  };
}
