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
    "user-library-read",
    "user-read-recently-played",
    "playlist-read-private",
    "user-library-read",
    "user-library-modify",
    "playlist-modify-public",
    "playlist-modify-private",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
  const CLIENT_ID = "ea9a91250949498f8bdd214e14bc26cd";
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
