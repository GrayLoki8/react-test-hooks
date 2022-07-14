import React, { useState,useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/auth-context";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
      localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
  };
    useEffect(()=>{
        const storedLoginInfo=localStorage.getItem("isLoggedIn");
        if (storedLoginInfo==='1'){
            setIsLoggedIn(true);
        }
    },[]);
  const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');

      setIsLoggedIn(false);
  };

  return (
        <AuthContext.Provider value={{
            isLoggedIn:isLoggedIn
        }}>
      <MainHeader   onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
        </AuthContext.Provider>
  );
}

export default App;
