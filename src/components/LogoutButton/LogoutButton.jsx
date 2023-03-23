import React from "react";
import "./LogoutButton.scss";
import { Link } from "react-router-dom";

const LogoutButton = ({ setToken }) => {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("expiresIn");
    setToken("");
  };

  return (
    <>
      <Link to="/">
        <button onClick={logout}>Wyloguj</button>
      </Link>
    </>
  );
};

export { LogoutButton };
