import { useContext } from 'react';
import AuthContext from '../../data/AuthContext';

import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = (props) => {
  const AuthCtx = useContext(AuthContext);

  return (
    <section className={classes.profile}>
      <h3>Your User Profile</h3>
      <h4>Current Token:{AuthCtx.token}</h4>

      <ProfileForm />
    </section>
  );
};

export default UserProfile;
