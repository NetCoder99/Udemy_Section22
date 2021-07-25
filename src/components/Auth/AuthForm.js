import { useState, useRef, useContext } from 'react';
import  { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import LoginUserApi from '../../data/LoginUserApi';

import classes from './AuthForm.module.css';
import AuthContext from '../../data/AuthContext';
 
// ----------------------------------------------------------------------------
const AuthForm = (props) => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  
  const [hasError,   setError]      = useState();
  const [hasSuccess, setSuccess] = useState();
  const [isLogin,    setIsLogin]    = useState(true);
  const [isLoading,  setIsLoading]  = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  AuthForm.propTypes = {
    setTokenHandlerPage: PropTypes.func.isRequired
  }

  const userNameRef = useRef();
  const passWordRef = useRef();

  const handleSubmit = async (e) => {
    console.log('handleSubmit:');
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const userName = userNameRef.current.value;
    const passWord = passWordRef.current.value;
    const creds = JSON.stringify({userName: userName,passWord: passWord});
    let res = null;
    let url = null;
    let reqType = null;

    if (isLogin) {
      url='http://localhost:8081/login';
      reqType='LoginRequest';
    }
    else {
      url='http://localhost:8081/signup';
      reqType='SignupRequest';
    }

    res = await LoginUserApi(url, creds, reqType, setError).then(

    );
    if (hasError){
      console.log('signup:res:hasError:status:' + hasError.status);
      console.log('signup:res:hasError:message:' + hasError.message);
    }
    else if (res.token)   {
      console.log('signup:res:login:'   + res.token);
      setSuccess({
        message: "Account created or login success" 
      });
      const expireTime = new Date((new Date().getTime) + (1000*60*10));
      AuthCtx.login(res.token, expireTime);
      history.replace("/");
    }
    else {
      console.log('signup:res:unkown:');
      setError({
        status: -2,
        message: "Unkown response from Auth server"
      });       
    }
    setIsLoading(false);

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={userNameRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={passWordRef}/>
        </div>

        <div className={classes.control}>
          {hasSuccess && <label className={classes.success}>{hasSuccess.message}</label>}
          {!hasSuccess && hasError && <label className={classes.error}>{hasError.message}</label>}
          {!hasSuccess && !hasError && <label className={classes.error}>&nbsp;</label>}
        </div>

        <div className={classes.actions}>

          {isLoading && <button disabled={true}>{'Processing ...'}</button>}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}

          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new email account' : 'Login with existing email account'}
          </button>

        </div>
      </form>
    </section>
  );
};

export default AuthForm;
