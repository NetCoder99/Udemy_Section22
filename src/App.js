import { useContext, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from './data/AuthContext';

import Layout from './components/Layout/Layout';
import MainNavigation from './components/Layout/MainNavigation';

import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const AuthCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'><AuthPage/></Route>
        { AuthCtx.isLoggedIn && (
          <Fragment>
          <Route path='/dashboard'><DashboardPage/></Route>
          <Route path='/profile'><UserProfile/></Route>
          </Fragment>
        )}
        <Route path='*'>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
