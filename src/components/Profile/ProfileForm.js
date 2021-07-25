import { useRef, useContext } from 'react';
import AuthContext from '../../data/AuthContext';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordref = useRef();
  const AuthCtx = useContext(AuthContext);

  const handleSubmit = (event) => {
    console.log('ProfileForm:handleSubmit:');
    event.preventDefault();
    const newPasswordVal = newPasswordref.current.value;
    console.log('ProfileForm:handleSubmit:newPassword:' + newPasswordVal);

    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'apiKey': AuthCtx.token
    });
    
    const reqBody = JSON.stringify ({
      userId : 1,
      passWord : newPasswordVal
    });

    fetch("http://localhost:8081/update", {
      method:  'POST',
      headers: myHeaders,
      body: reqBody
    }).then(res => {
      if (res.ok) {
        console.log('ProfileForm:handleSubmit:res:ok' + res);
      }
      else {
        console.log('ProfileForm:handleSubmit:res:failed' + res);
      }
    });
  }



  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordref} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
