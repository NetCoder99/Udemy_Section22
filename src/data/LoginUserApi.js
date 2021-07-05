// ----------------------------------------------------------------------------
async function LoginUserApi(authUrl, credentials, apiKey) {
    console.log('LoginUserApi:started:' + authUrl);
  
    return fetch(authUrl+"?apiKey=" + apiKey, {
      method:  'POST',
      headers: {'Content-Type': 'application/json'},
      body:    credentials
    })

    .then(response => { //ReadableStream hiding response
      return response; //Convert ReadableStream to text
    })

    .then(data => { 
      //console.log('LoginUserApi:data:'+ data)
      const tJson = data.json();
      return tJson; } 
      )
    .catch(error => console.log('LoginUserApi:error:'+ error));
   }
export default LoginUserApi;
