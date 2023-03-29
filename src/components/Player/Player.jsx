import React from "react";
import "./Player.scss";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ token }) => {
  return (
    <div className="player">
      <SpotifyPlayer
        styles={{
          activeColor: "#fff",
          bgColor: "#201c1c",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "10vh",
        }}
        token={token}
        uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
      />
    </div>
  );
};

export { Player };
