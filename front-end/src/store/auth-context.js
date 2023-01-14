import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  currentPage: "회원 목록",
  setCurrentPage: (page) => {},
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: (name, pw) => {},
});

export const AuthContextProvider = (props) => {
  const [currentPage, setCurrentPage] = useState("회원 목록");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("IsLoggedIn");
    if (storedLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  });

  const loginHandler = () => {
    localStorage.setItem("IsLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("IsLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
