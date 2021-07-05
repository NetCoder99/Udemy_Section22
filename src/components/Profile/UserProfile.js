import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = (props) => {

  console.log('token4:' + props.tokenData.token);

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <h2>Current Token:{props.tokenData.token}</h2>

      <ProfileForm />
    </section>
  );
};

export default UserProfile;
