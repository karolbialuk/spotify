import { React, useEffect, useState } from "react";
import "./PlaylistSongs.scss";
import { BsFillTriangleFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { SongsList } from "../SongsList/SongsList";

import {
  useFetchPlaylistInfoQuery,
  useFetchPlaylistSongsQuery,
  usePlayClickedSongMutation,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { changeId, changePlay } from "../../store";
import { useLocation } from "react-router-dom";

const PlaylistSongs = ({ token, devices }) => {
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const [playSong, playSongResults] = usePlayClickedSongMutation();

  useEffect(() => {
    const playlistId = location.pathname.split("/")[2];
    setId(playlistId);
  }, [location]);

  const { data, isFetching, error } = useFetchPlaylistInfoQuery({
    token,
    id,
  });

  const {
    data2 = data,
    error2 = error,
    isFetching2 = isFetching,
  } = useFetchPlaylistSongsQuery({
    token,
    id,
  });

  const player_id = useSelector((state) => {
    return state.uri.id;
  });

  const play_status = useSelector((state) => {
    return state.uri.play;
  });

  const handlePlayMusic = () => {
    const uri = data2 && data2.tracks.items.map((item) => item.track.uri);
    console.log("tojestto", uri);

    if (!player_id && !play_status) {
      dispatch(changeId(uri));
      dispatch(changePlay(true));
    } else if (play_status) {
      playSong({ uri, token });
    }
  };

  if (isFetching) {
    return <div>Ładowanie</div>;
  } else if (error) {
    return <div>błąd</div>;
  } else {
    return (
      <div className="playlist-songs">
        <div className="playlist-songs__container">
          <div className="playlist-songs__header">
            <div className="playlist-songs__img">
              {data.images[0] && <img src={data.images[0].url} />}
            </div>
            <div className="playlist-songs__text">
              <h3>Playlista</h3>
              <h1>{data.name}</h1>
              <div className="playlist-songs__text-bottom">
                {data.description}
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
            data={data2}
            isFetching={isFetching2}
            error={error2}
            token={token}
          />
        </div>
      </div>
    );
  }
};

export { PlaylistSongs };
