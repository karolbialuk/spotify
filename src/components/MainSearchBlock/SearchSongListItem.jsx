import { React, useState, useEffect } from "react";
import "./MainSearchBlock.scss";
import { AiFillHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillTriangleFill, BsChevronLeft } from "react-icons/bs";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  useLikeSongMutation,
  useRemoveSongMutation,
  useCheckSavedTracksQuery,
  useGetCurrentUserQuery,
  useFetchUserPlaylistsQuery,
  useAddItemToPlaylistMutation,
  usePlayClickedSongMutation,
  changeId,
  changePlay,
} from "../../store";

const SearchSongListItem = ({ track, token, refetch, search }) => {
  const [checkedData, setCheckedData] = useState([]);
  const [isLiked, setisLiked] = useState(false);
  const [likeSong, likeSongResults] = useLikeSongMutation();
  const [removeSong, removeSongResults] = useRemoveSongMutation();
  const [playSong, playSongResults] = usePlayClickedSongMutation();

  const dispatch = useDispatch();
  const location = useLocation();

  const href = location.pathname.split("/")[1];

  let id = track?.id;

  const { data: data3 } = useGetCurrentUserQuery(token);

  const [addSongToPlaylist, addSongToPlaylistResults] =
    useAddItemToPlaylistMutation();

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  // useEffect(() => {
  //   const fetchData = async ({ id, token }) => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.spotify.com/v1/me/tracks/contains",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //           params: {
  //             ids: id,
  //           },
  //         }
  //       );
  //       setCheckedData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData({ id, token });
  // }, [search]);

  const { data } = useCheckSavedTracksQuery({ token, id });
  const { data: albumInfo } = useFetchUserPlaylistsQuery(token);

  useEffect(() => {
    if (data) {
      setCheckedData(data);
    }
  }, [data]);

  useEffect(() => {
    if (search) {
      refetch();
    }
  }, [search]);

  const handleClick = (e) => {
    e.stopPropagation();

    const element = document.getElementById(track.id);
    const el = element.querySelector(".main-search-block__btn-third-container");
    el.classList.toggle("active");
  };

  const handleClick2 = (e) => {
    e.stopPropagation();
    const element = document.getElementById(track.id);
    const el = element.querySelector(
      ".main-search-block__btn-third-inside-element"
    );
    el.classList.toggle("active");
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    const element = e.target.closest(".main-search-block__content2-like");

    if (checkedData.toString() === "false") {
      await likeSong({ token, id });
      console.log(likeSongResults);
    } else if (checkedData.toString() === "true") {
      await removeSong({ token, id });
      console.log(removeSongResults);
    }

    if (element.classList.contains("active")) {
      element.classList.remove("active");
    } else if (!element.classList.contains("active")) {
      element.classList.add("active");
    }

    setisLiked((prevIsLiked) => !prevIsLiked);
  };

  const handleRemove = (e) => {
    const element = document.getElementById(track.id);
    const el = element.querySelector(".main-search-block__btn-third-container");
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

  return (
    <div
      id={track.id}
      onClick={handlePlaySong}
      className="main-search-block__content2-container-element"
    >
      <div className="main-search-block__content2-img-container">
        <div className="main-search-block__content2-img">
          <img src={track.album && track.album.images[2].url} />
        </div>

        <div className="main-search-block__content2-text-container">
          <div className="main-search-block__content2-text-first">
            {track.name}
          </div>
          <div className="main-search-block__content2-text-second">
            {track.artists
              .slice(0, 10)
              .map((artist, index) => {
                return artist.name;
              })
              .join(", ")}
          </div>
        </div>
      </div>

      <div className="main-search-block__content2-time">
        <button
          onClick={(e) => handleLike(e)}
          className={`main-search-block__content2-like ${
            checkedData && checkedData.toString() === "true" ? "active" : ""
          }`}
        >
          {checkedData && checkedData.toString() === "false" ? (
            <AiFillHeart color={isLiked ? "green" : "white"} size={20} />
          ) : (
            <AiFillHeart color={isLiked ? "white" : "green"} size={20} />
          )}
        </button>
        <div className="main-search-block__content2-time-element">
          <div className={`main-search-block__content2-time-element1`}>
            <BiDotsHorizontalRounded
              onClick={(e) => handleClick(e)}
              size={25}
            />
            <div
              onMouseLeave={handleRemove}
              id="btn-third-container"
              className="main-search-block__btn-third-container active"
            >
              <div className="main-search-block__btn-third-element active">
                <div className="main-search-block__btn-third-option-container">
                  <div className="main-search-block__btn-third-option">
                    <BsChevronLeft />
                    <div
                      onClick={(e) => handleClick2(e)}
                      className="main-search-block__btn-third-option-text"
                    >
                      Dodaj do Playlisty
                    </div>
                  </div>
                  <div className="main-search-block__btn-third-option">
                    {albumInfo?.owner?.display_name === data3?.display_name && (
                      <div
                        onClick={(e) => handleRemovePlaylist(e)}
                        className="main-search-block__btn-third-option-text"
                      >
                        Usuń z Playlisty
                      </div>
                    )}
                  </div>
                </div>

                <div
                  id="btn-third-inside-element"
                  className="main-search-block__btn-third-inside-element active"
                >
                  {albumInfo?.items?.map((item) => {
                    if (
                      item.owner.display_name === data3.display_name &&
                      location.pathname.split("/")[2] !== item.id
                    ) {
                      return (
                        <div
                          id={item.id}
                          onClick={(e) => handleAdd(e)}
                          className="main-search-block__btn-third-text"
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
          <div className="main-search-block__content2-time-element2">
            {millisToMinutesAndSeconds(track.duration_ms)}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SearchSongListItem };
