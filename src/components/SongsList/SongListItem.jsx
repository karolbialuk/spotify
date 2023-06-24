import { React, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  usePlayClickedSongMutation,
  useLikeSongMutation,
  useRemoveSongMutation,
  useFetchUserPlaylistsQuery,
  useGetCurrentUserQuery,
  useAddItemToPlaylistMutation,
  useFetchPlaylistSongsQuery,
  useRemoveAlbumMutation,
} from "../../store";
import { changeId, changePlay } from "../../store";
import { AiFillHeart, AiOutlineConsoleSql } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillTriangleFill, BsChevronLeft } from "react-icons/bs";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SongListItem = ({ song, number, token, albumInfo, refetch }) => {
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
  const [addSongToPlaylist, addSongToPlaylistResults] =
    useAddItemToPlaylistMutation();

  const [removeSongFromPlaylist, removeSongFromPlaylistResults] =
    useRemoveSongMutation();

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

    const element = document.getElementById(id);
    const el = element.querySelector(".songs-list__like");

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

  const { data, isFetching, error } = useFetchUserPlaylistsQuery(token);

  const { data: data3 } = useGetCurrentUserQuery(token);

  const handleClick = (e) => {
    e.stopPropagation();
    const element = document.getElementById(id);
    const el = element.querySelector(".songs-list__btn-third-container");
    el.classList.toggle("active");
  };

  const handleClick2 = (e) => {
    e.stopPropagation();
    const element = document.getElementById(id);
    const el = element.querySelector(".songs-list__btn-third-inside-element");
    el.classList.toggle("active");
  };

  const handleRemove = () => {
    const element = document.getElementById(id);
    const el = element.querySelector(".songs-list__btn-third-container");
    el.classList.add("active");
  };

  let playlistId;

  const handleAdd = async (e) => {
    e.stopPropagation();

    playlistId = e.target.id;

    const data = await axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Wystąpił błąd", error);
      });

    const playlistItems = data.items.map((item) => {
      return item.track.id;
    });

    console.log({ playlistItems });

    const songId = "spotify:track:" + id;

    if (!playlistItems.includes(id)) {
      addSongToPlaylist({ token, playlistId, songId });
    } else {
      return;
    }

    handleRemove();
  };

  const handleRemovePlaylist = async (e) => {
    e.stopPropagation();
    playlistId = location.pathname.split("/")[2];

    const trackUri = "spotify:track:" + id;

    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = {
      tracks: [{ uri: trackUri }],
    };

    if (albumInfo.owner.display_name === data3.display_name) {
      axios
        .delete(url, { headers: headers, data: data })
        .then((response) => {
          console.log("Utwór został usunięty z playlisty.");
          refetch();
        })
        .catch((error) => {
          console.error(
            "Wystąpił błąd podczas usuwania utworu z playlisty:",
            error
          );
        });
    }

    handleRemove();
  };

  if (song) {
    return (
      <div className="songs-list__element" id={id} onClick={handlePlaySong}>
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
            onClick={(e) => handleLike(e)}
          >
            {checkedData && checkedData.toString() === "false" ? (
              <AiFillHeart color={isLiked ? "green" : "white"} size={20} />
            ) : (
              <AiFillHeart color={isLiked ? "white" : "green"} size={20} />
            )}
          </button>

          <div className="songs-list__option-element">
            <BiDotsHorizontalRounded
              onClick={(e) => handleClick(e)}
              size={25}
            />
            <div
              onMouseLeave={handleRemove}
              id="btn-third-container"
              className="songs-list__btn-third-container active"
            >
              <div className="songs-list__btn-third-element active">
                <div className="songs-list__btn-third-option-container">
                  <div className="songs-list__btn-third-option">
                    <BsChevronLeft />
                    <div
                      onClick={(e) => handleClick2(e)}
                      className="songs-list__btn-third-option-text"
                    >
                      Dodaj do Playlisty
                    </div>
                  </div>
                  <div className="songs-list__btn-third-option">
                    {albumInfo?.owner?.display_name === data3?.display_name && (
                      <div
                        onClick={(e) => handleRemovePlaylist(e)}
                        className="songs-list__btn-third-option-text"
                      >
                        Usuń z Playlisty
                      </div>
                    )}
                  </div>
                </div>

                <div
                  id="btn-third-inside-element"
                  className="songs-list__btn-third-inside-element active"
                >
                  {data?.items?.map((item) => {
                    if (
                      item.owner.display_name === data3.display_name &&
                      location.pathname.split("/")[2] !== item.id
                    ) {
                      return (
                        <div
                          id={item.id}
                          onClick={(e) => handleAdd(e)}
                          className="songs-list__btn-third-text"
                        >
                          {item?.name}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

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
