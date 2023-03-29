import { React, useEffect, useState } from "react";

import {
  Player,
  LogoutButton,
  LoginButton,
  LeftSidebar,
  MainElements,
  Navbar,
} from "../../components/index";
import "./HomePage.scss";

const ParamsSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

const HomePage = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = ParamsSpotifyAuth(
        window.location.hash
      );
      localStorage.setItem("accessToken", access_token);
      setToken(localStorage.getItem("accessToken"));
      localStorage.setItem("expiresIn", expires_in);
      localStorage.setItem("tokenType", token_type);
    }
  }, []);

  if (token) {
    return (
      <>
        <div className="root">
          <LeftSidebar />
          <div className="root__main-container">
            <Navbar />
            <MainElements />
          </div>
        </div>
        <Player token={token} />
      </>
    );
  }
};

export { HomePage };
