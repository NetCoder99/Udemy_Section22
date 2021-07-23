import { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import LoginUserApi from '../../data/LoginUserApi';

import classes from './AuthForm.module.css';
import AuthContext from '../../data/AuthContext';
 
// ----------------------------------------------------------------------------
const AuthForm = (props) => {
  const AuthCtx = useContext(AuthContext);
  const [isLogin,   setIsLogin]     = useState(true);
  const [isLoading, setIsLoaoding]  = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  AuthForm.propTypes = {
    setTokenHandlerPage: PropTypes.func.isRequired
  }

  const userNameRef = useRef();
  const passWordRef = useRef();

  const handleSubmit = async e => {
    console.log('handleSubmit:');
    e.preventDefault();
    setIsLoaoding(true);

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

    res = await LoginUserApi(url, creds, reqType);
    if (res.token)   {
      console.log('signup:res:login:'   + res.token);
      AuthCtx.login(res.token);
    }
    if (res.message) {
      console.log('signup:res:message:' + res.message);
      alert(res.message);
    }
    setIsLoaoding(false);

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
        <div className={classes.actions}>
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
