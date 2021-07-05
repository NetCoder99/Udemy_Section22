import { useState, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import MainNavigation from './components/Layout/MainNavigation';

import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

function App() {

  const [token, setToken] = useState(true);

  const tokenHandlerApp = (tokenData) => {
    console.log('+ tokenHandlerApp:' + tokenData.token);
    setToken(tokenData);
  }

  const logoutHandlerApp = () => {
    console.log('+ logoutHandler1:App');
    setToken(null);
  }

  if(!token) {
    return (
      <Fragment>
        <MainNavigation setLogoutHandlerApp={logoutHandlerApp} />
        <AuthPage testValue={"Not logged in"} setTokenHandlerApp={tokenHandlerApp} />
      </Fragment>
    );
  }

  return (
    <Layout setLogoutHandlerApp={logoutHandlerApp}>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage testValue={"Logged in"} setTokenHandlerApp={tokenHandlerApp} />
        </Route>
        <Route path='/dashboard'>
          <DashboardPage />
        </Route>
        <Route path='/profile'>
          <UserProfile tokenData={token}  />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
