import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const SongListItem = ({ songs, number, link }) => {
  const [first, setFirst] = useState("");
  const { track } = songs;
  const id = useSelector((state) => {
    return state.uri.id;
  });

  // const splitLink = () => {
  //   if (link) {
  //     return "spotify:track:" + link.href.split("/")[4];
  //   } else {
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   console.log(link);
  // }, [link]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <div
      className={`songs-list__element ${track.uri === first ? "active" : ""}`}
    >
      <div className="songs-list__title">
        <div className="songs-list__number">{number}</div>
        <div className="songs-list__title-img">
          <img src={track.album.images[2].url} />
        </div>
        <div className="songs-list__title-text">
          <h1>{track.name}</h1>
          <p>
            {track.artists.map((item, index) => (
              <>
                {item.name}
                {index === track.artists.length - 1 ? "" : ", "}
              </>
            ))}
          </p>
        </div>
      </div>
      <div className="songs-list__album">{track.album.name}</div>
      <div className="songs-list__time">
        {millisToMinutesAndSeconds(track.duration_ms)}
      </div>
    </div>
  );
};

export default SongListItem;
