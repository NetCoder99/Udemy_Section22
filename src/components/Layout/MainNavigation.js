import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../data/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
  const AuthCtx = useContext(AuthContext);

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
            {AuthCtx.isLoggedIn &&<button onClick={AuthCtx.logout}>Logout</button>} 
            {!AuthCtx.isLoggedIn &&<Link to='/auth'>Login</Link>} 
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
