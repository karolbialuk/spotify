import React from "react";
import "./Player.scss";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ token }) => {
  return (
    <>
      <SpotifyPlayer
        token={token}
        uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
      />
    </>
  );
};

export { Player };
