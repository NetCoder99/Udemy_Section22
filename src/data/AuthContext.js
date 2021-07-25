import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    userId: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
}); 

const getTokenRemainingTime = (expireTime) => {
    const crntTime  = new Date().getTime();
    const adjExpirTime = new Date(expireTime).getTime();
    const remainingTime = adjExpirTime - crntTime;
    return remainingTime;
}

export const AuthContextProvider = (props) => {
    const initToken = localStorage.getItem('token');

    const [token, setToken]  = useState(initToken);
    const userLoggedIn       = !!token;

    const logoutHandler  = () => {
        console.log("AuthContextProvider.logoutHandler");
        localStorage.removeItem("token");
        setToken(null);
    };

    const loginHandler       = (token, expireTime) => {
        console.log("AuthContextProvider.loginHandler:" + token);
        setToken(token);
        localStorage.setItem("token", token);

        const tokenRemainingTime = getTokenRemainingTime(expireTime);
        setTimeout(logoutHandler, tokenRemainingTime);
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