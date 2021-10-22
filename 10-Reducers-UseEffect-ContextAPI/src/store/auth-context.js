import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
   isLoggedIn: false,
   onLogout: () => { },
   onLogin: (email, password) => { },
})

export const AuthContextProvider = props => {
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   const storedLoggedInInformation = localStorage.getItem("LoggedIn");

   useEffect(() => {
      if (storedLoggedInInformation === "1") {
         setIsLoggedIn(true);
      }
   }, [storedLoggedInInformation]);

   const logoutHandler = () => {
      localStorage.removeItem("LoggedIn");
      setIsLoggedIn(false)
   }

   const loginHandler = () => {
      localStorage.setItem("LoggedIn", "1");
      setIsLoggedIn(true)
   }

   return <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogin: loginHandler,
      onLogout: logoutHandler
   }}>{props.children}</AuthContext.Provider>
}

export default AuthContext