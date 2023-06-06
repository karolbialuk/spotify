import { React, useEffect, useState } from "react";
import "./Player.scss";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector, useDispatch } from "react-redux";

const Player = ({ token }) => {
  const id = useSelector((state) => {
    return state.uri.id;
  });

  const play = useSelector((state) => {
    return state.uri.play;
  });

  console.log({ playerid: id });

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
        play={play}
        token={token}
        uris={id}
        layout="responsive"
      />
    </div>
  );
};

export { Player };
