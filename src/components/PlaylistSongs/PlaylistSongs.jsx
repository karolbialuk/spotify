import { React, useEffect, useState } from "react";
import "./PlaylistSongs.scss";
import { BsFillTriangleFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { SongsList } from "../SongsList/SongsList";

import {
  useFetchPlaylistInfoQuery,
  useFetchPlaylistSongsQuery,
  useFetchAlbumInfoQuery,
  useFetchAlbumSongsQuery,
  usePlayClickedSongMutation,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { changeId, changePlay } from "../../store";
import { useLocation } from "react-router-dom";

const PlaylistSongs = ({ token, devices }) => {
  const [id, setId] = useState("");
  const [fetch, setFetch] = useState(true);
  const [fetchInfoData, setFetchInfoData] = useState();
  const [dataSongs, setDataSongs] = useState();

  const dispatch = useDispatch();
  const location = useLocation();

  const [playSong, playSongResults] = usePlayClickedSongMutation();

  useEffect(() => {
    const playlistId = location.pathname.split("/")[2];
    setId(playlistId);
  }, [location]);

  const href = location.pathname.split("/")[1];

  const { data, isFetching, error } = useFetchPlaylistInfoQuery({
    token,
    id,
  });

  const {
    data: data2 = data,
    isFetching: isFetching2 = isFetching,
    error: error2 = error,
  } = useFetchAlbumInfoQuery({ token, id });

  useEffect(() => {
    if (href === "playlist" && data) {
      setFetchInfoData(data);
    } else if (href === "album" && data2) {
      setFetchInfoData(data2);
    }
  }, [data, data2]);

  console.log({ infodata: fetchInfoData });

  const player_id = useSelector((state) => {
    return state.uri.id;
  });

  const play_status = useSelector((state) => {
    return state.uri.play;
  });

  const handlePlayMusic = () => {
    const uri =
      href === "playlist"
        ? data.tracks.items.map((item) => item.track.uri)
        : href === "album"
        ? data2.tracks.items.map((item) => item.uri)
        : "";

    if (!player_id && !play_status) {
      dispatch(changeId(uri));
      dispatch(changePlay(true));
    } else if (play_status) {
      playSong({ uri, token });
    }
  };

  if (
    (isFetching && href === "playlist") ||
    (isFetching2 && href === "album")
  ) {
    return <div>Ładowanie</div>;
  } else if (fetchInfoData) {
    return (
      <div className="playlist-songs">
        <div className="playlist-songs__container">
          <div className="playlist-songs__header">
            <div className="playlist-songs__img">
              {fetchInfoData.images[0] && (
                <img src={fetchInfoData.images[0].url} />
              )}
            </div>
            <div className="playlist-songs__text">
              <h3>Playlista</h3>
              <h1>{fetchInfoData.name}</h1>
              <div className="playlist-songs__text-bottom">
                {fetchInfoData.description}
              </div>
            </div>
          </div>
          <div className="playlist-songs__buttons">
            <button onClick={handlePlayMusic}>
              <div className="playlist-songs__btn-first">
                <BsFillTriangleFill
                  size={20}
                  style={{ bottom: "2px", position: "relative" }}
                />
              </div>
            </button>
            <div className="playlist-songs__btn-second">
              <AiOutlineHeart size={40} />
            </div>
            <div className="playlist-songs__btn-third">
              <BiDotsHorizontalRounded size={40} />
            </div>
          </div>
          <SongsList
            data={href === "playlist" ? data : data2}
            isFetching={href === "playlist" ? isFetching : isFetching2}
            error={href === "playlist" ? error : error2}
            albumInfo={fetchInfoData}
            token={token}
          />
        </div>
      </div>
    );
  }
};

export { PlaylistSongs };
