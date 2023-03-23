import React from "react";
import "./LoginPage.scss";

const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
const CLIENT_ID = "ca7f379f2e7e42d5af1e29834f9483bd";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https:/accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/home";

const LoginPage = () => {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export { LoginPage };
