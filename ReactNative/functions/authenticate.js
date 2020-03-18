// ACCEPTS USERNAME AND PASSWORD AND RETURNS auth_response.json
export function sendCredentials(username, password) {


  // FETCH PARAMETERS
  const url = 'https://ucon-gaming.org/reg/api/services.php?action=login';
  const body = {
    user: username,
    pass: password
  };

  // WRAP FETCH IN A TIMEOUT (10000 MILLISECONDS)
  return new Promise(function(resolve, reject) {
    const timeout = setTimeout(function() {
        reject(new Error('Request timed out'));
      }, 10000);

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
      const responseText = await response.text();
      return responseText;
    }

    return {
      error: true,
      message: response.status
    };
  })
  .catch(error => {
    return {
      error: true,
      message: "NetworkError"
    };
  });
}
