import AuthForm from '../components/Auth/AuthForm';

// ----------------------------------------------------------------------------
const AuthPage = (props) => {

  const setTokenHandlerPage = (tokenObj) => {
    console.log('token2:' + tokenObj.token);
    props.setTokenHandlerApp(tokenObj);
  }

  return <AuthForm setTokenHandlerPage={setTokenHandlerPage}/>;
};

export default AuthPage;
