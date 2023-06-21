import { React, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  usePlayClickedSongMutation,
  useLikeSongMutation,
  useRemoveSongMutation,
  useCheckSavedSongsQuery,
} from "../../store";
import { changeId, changePlay } from "../../store";
import { AiFillHeart, AiOutlineConsoleSql } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SongListItem = ({ song, number, token, albumInfo }) => {
  const [isLiked, setisLiked] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const href = location.pathname.split("/")[1];

  // song.track.id to playlist song.id to album

  let id =
    href === "playlist" || href === "favourite" ? song?.track?.id : song?.id;

  const [playSong, playSongResults] = usePlayClickedSongMutation();
  const [likeSong, likeSongResults] = useLikeSongMutation();
  const [removeSong, removeSongResults] = useRemoveSongMutation();

  // const { data, isFetching, error } = useCheckSavedSongsQuery({ token, id });
  const [idToChange, setidToChange] = useState();
  const [checkedData, setCheckedData] = useState([]);

  useEffect(() => {
    const fetchData = async ({ id, token }) => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/tracks/contains",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              ids: id,
            },
          }
        );
        setCheckedData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData({ id, token });
  }, []);

  const handleLike = async (e) => {
    e.stopPropagation();

    const el = document.getElementById(id);

    if (checkedData.toString() === "false") {
      await likeSong({ token, id });
    } else if (checkedData.toString() === "true") {
      await removeSong({ token, id });
    }

    if (el.classList.contains("active")) {
      el.classList.remove("active");
      const parent = el.parentElement;
      href === "favourite" && parent.parentElement.remove();
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
    const uri = [
      href === "favourite" || href === "playlist"
        ? song.track.uri
        : href === "author" || href === "album"
        ? song.uri
        : "",
    ];
    if (!player_id && !play_status) {
      dispatch(
        changeId(
          href === "favourite" || href === "playlist"
            ? song.track.uri
            : href === "author" || href === "album"
            ? song.uri
            : ""
        )
      );
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

  if (song) {
    return (
      <div className="songs-list__element" onClick={handlePlaySong}>
        <div className="songs-list__title">
          <div className="songs-list__number">{number}</div>
          <div className="songs-list__title-img">
            {href === "playlist" || href === "favourite"
              ? song?.track?.album?.images[2] && (
                  <img src={song?.track?.album?.images[2]?.url} />
                )
              : href === "author"
              ? song.album.images[2] && <img src={song.album.images[2].url} />
              : albumInfo.images[2] && <img src={albumInfo.images[2].url} />}
          </div>
          <div className="songs-list__title-text">
            <h1>
              {href === "playlist" || href === "favourite"
                ? song?.track?.name
                : song?.name}
            </h1>
            <p>
              {href === "playlist" || href === "favourite"
                ? song?.track?.artists?.slice(0, 5).map((item, index) => (
                    <>
                      {item.name}
                      {index === song?.track?.artists?.length - 1 ? "" : ", "}
                    </>
                  ))
                : song?.artists?.slice(0, 5).map((item, index) => (
                    <>
                      {item.name}
                      {index === song?.artists?.length - 1 ? "" : ", "}
                    </>
                  ))}
            </p>
          </div>
        </div>
        <div className="songs-list__album">
          {href === "playlist" || href === "favourite"
            ? song?.track?.album?.name
            : ""}
        </div>
        <div className="songs-list__time">
          <button
            className={`songs-list__like ${
              checkedData && checkedData.toString() === "true" ? "active" : ""
            }`}
            id={id}
            onClick={(e) => handleLike(e)}
          >
            {checkedData && checkedData.toString() === "false" ? (
              <AiFillHeart color={isLiked ? "green" : "white"} size={20} />
            ) : (
              <AiFillHeart color={isLiked ? "white" : "green"} size={20} />
            )}
          </button>

          <div className="songs-list__time-element">
            {href === "playlist" || href === "favourite"
              ? millisToMinutesAndSeconds(song?.track?.duration_ms)
              : millisToMinutesAndSeconds(song?.duration_ms)}
          </div>
        </div>
      </div>
    );
  }
};

export default SongListItem;
