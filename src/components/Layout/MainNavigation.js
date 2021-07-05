import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {

  const logoutHandlerMain = () => {
    console.log('setLogoutHandler:Main:');
    props.setLogoutHandlerApp();
    //props.onLogout();
  }


  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <button onClick={logoutHandlerMain}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
