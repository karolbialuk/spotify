import React from "react";
import { LoginButton } from "../../components";
import "./LoginPage.scss";
import spotifyLogo from "../../assets/images/spotify-logo.png";

const LoginPage = () => {
  if (!localStorage.getItem("accessToken")) {
    return (
      <div className="login-page">
        <div className="login-page__container">
          <div className="login-page__elements">
            <div className="login-page__text">
              <h1>Moja wersja Spotify</h1>
              <h2>Aby z niej korzystać musisz mieć premium!</h2>
            </div>
            <LoginButton />
            <div className="login-page__logo">
              <img src={spotifyLogo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    window.location.replace("/home");
  }
};

export { LoginPage };
