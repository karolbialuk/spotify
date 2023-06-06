import { React, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  usePlayClickedSongMutation,
  useLikeSongMutation,
  useRemoveSongMutation,
  useCheckSavedTracksQuery,
} from "../../store";
import { changeId, changePlay } from "../../store";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const SongListItem = ({ songs, number, token }) => {
  const { track } = songs;

  const [isLiked, setisLiked] = useState(false);

  const dispatch = useDispatch();

  const id = track.id;

  const [playSong, playSongResults] = usePlayClickedSongMutation();
  const [likeSong, likeSongResults] = useLikeSongMutation();
  const [removeSong, removeSongResults] = useRemoveSongMutation();
  const { data, isFetching, error } = useCheckSavedTracksQuery({ token, id });

  const handleLike = async ({ id, e }) => {
    e.stopPropagation();
    const el = document.getElementById(id);

    if (data.toString() === "false") {
      await likeSong({ token, id });
    } else if (data.toString() === "true") {
      await removeSong({ token, id });
    }

    if (el.classList.contains("active")) {
      el.classList.remove("active");
    } else if (!el.classList.contains("active")) {
      el.classList.add("active");
    }

    setisLiked((prevIsLiked) => !prevIsLiked);
  };

  const player_id = useSelector((state) => {
    return state.uri.id;
  });

  const play_status = useSelector((state) => {
    return state.uri.play;
  });

  const handlePlaySong = () => {
    const uri = [track.uri];
    if (!player_id && !play_status) {
      dispatch(changeId(track.uri));
      dispatch(changePlay(true));
    } else if (play_status) {
      playSong({ uri, token });
    }
  };

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <div className="songs-list__element" onClick={handlePlaySong}>
      <div className="songs-list__title">
        <div className="songs-list__number">{number}</div>
        <div className="songs-list__title-img">
          {track.album.images[2] && <img src={track.album.images[2].url} />}
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
        <button
          className={`songs-list__like ${
            data && data.toString() === "true" ? "active" : ""
          }`}
          id={track.id}
          onClick={(e) => handleLike({ id, e })}
        >
          {data && data.toString() === "false" ? (
            <AiFillHeart color={isLiked ? "green" : "white"} size={20} />
          ) : (
            <AiFillHeart color={isLiked ? "white" : "green"} size={20} />
          )}
        </button>

        <div className="songs-list__time-element">
          {millisToMinutesAndSeconds(track.duration_ms)}
        </div>
      </div>
    </div>
  );
};

export default SongListItem;
