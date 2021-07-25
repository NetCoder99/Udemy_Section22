// ----------------------------------------------------------------------------
async function LoginUserApi(authUrl, credentials, apiKey, setError) {
    console.log('LoginUserApi:started:' + authUrl);
    let tBody = '';
    try {
      const response = await fetch(authUrl+"?apiKey=" + apiKey, {
        method:  'POST',
        headers: {'Content-Type': 'application/json'},
        body:    credentials
      })
      const contentType = response.headers.get("content-type");
      console.log("LoginUserApi.response.contentType:" + contentType);
      
      if (contentType === "application/json") 
      {tBody = await response.json();}
      else 
      {tBody = await response.text();}

      if (!response.ok) {
        console.log("LoginUserApi.response.status:"     + response.status);
        console.log("LoginUserApi.data.message:"        + tBody.message);
        setError({
          status: response.status,
          message: tBody.message 
        }); 
      }
      return tBody;
    }
    catch(error) 
    { 
        console.log("LoginUserApi.error:" + error.message);
        setError({
          status: -1,
          message: error.message 
        }); 
    }

  }

  export default LoginUserApi;
