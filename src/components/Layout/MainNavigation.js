import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthContext from '../../data/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event) => { 
    AuthCtx.logout();
    history.replace("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li>
            {AuthCtx.isLoggedIn &&<Link to='/profile'>Profile</Link>} 
          </li>
          <li>
            {AuthCtx.isLoggedIn &&<button onClick={logoutHandler}>Logout</button>} 
            {!AuthCtx.isLoggedIn &&<Link to='/auth'>Login</Link>} 
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
