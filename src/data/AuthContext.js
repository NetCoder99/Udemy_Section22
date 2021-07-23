import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},

}); 

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const userLoggedIn     = !!token;
    const loginHandler   = (token) => {
        console.log("AuthContextProvider.loginHandler:" + token);
        setToken(token);
    };
    const logoutHandler  = () => {
        console.log("AuthContextProvider.logoutHandler");
        setToken(null);
    };
    const contextValue     = {
        token: token,
        isLoggedIn: userLoggedIn, 
        login: loginHandler,
        logout: logoutHandler
    };
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;