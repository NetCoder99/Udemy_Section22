import { useContext } from 'react';
import AuthContext from '../../data/AuthContext';

import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  const AuthCtx = useContext(AuthContext);
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      <div>
      {AuthCtx.isLoggedIn && 
        <ul>
          <li>List Item 1</li>
          <li>List Item 2</li>
        </ul>
      }
      {!AuthCtx.isLoggedIn && 
        <p>Please sign in to see your available functions.</p>
      }
      </div>
    </section>
  );
};

export default StartingPageContent;
