import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {

  const logoutHandlerApp = () => {
    console.log('setLogoutHandler:Main:');
    props.setLogoutHandlerApp();
    //props.onLogout();
  }

  return (
    <Fragment>
      <MainNavigation setLogoutHandlerApp={logoutHandlerApp} props={props.children}/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
