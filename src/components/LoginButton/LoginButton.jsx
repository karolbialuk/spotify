import React from "react";
import "./LoginButton.scss";

const LoginButton = () => {
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
  const CLIENT_ID = "ca7f379f2e7e42d5af1e29834f9483bd";
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https:/accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/home";
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };
  return (
    <>
      <button onClick={handleLogin}>Zaloguj</button>
    </>
  );
};

export { LoginButton };
