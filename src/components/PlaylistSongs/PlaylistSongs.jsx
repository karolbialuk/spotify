import { React, useEffect, useState } from "react";
import "./PlaylistSongs.scss";
import { BsFillTriangleFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { SongsList } from "../SongsList/SongsList";
import {
  useFetchPlaylistInfoQuery,
  useFetchPlaylistSongsQuery,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { changeId, fetchSongs } from "../../store";
import { useLocation } from "react-router-dom";

const PlaylistSongs = ({ token }) => {
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const handleChangeUri = (id) => {
    dispatch(changeId(id));
  };

  useEffect(() => {
    const playlistId = location.pathname.split("/")[2];
    setId(playlistId);
    handleChangeUri("spotify:playlist:" + playlistId);
  }, [location]);

  const { data, isFetching, error } = useFetchPlaylistInfoQuery({
    token,
    id,
  });

  console.log(id);

  const {
    data2 = data,
    error2 = error,
    isFetching2 = isFetching,
  } = useFetchPlaylistSongsQuery({
    token,
    id,
  });

  console.log({ data2: data2 });

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
              <img src={data.images[0].url} />
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
            <div className="playlist-songs__btn-first">
              <BsFillTriangleFill
                size={20}
                style={{ bottom: "2px", position: "relative" }}
              />
            </div>
            <div className="playlist-songs__btn-second">
              <AiOutlineHeart size={40} />
            </div>
            <div className="playlist-songs__btn-third">
              <BiDotsHorizontalRounded size={40} />
            </div>
          </div>
          <SongsList
            data2={data2}
            isFetching2={isFetching2}
            error2={error2}
            token={token}
          />
        </div>
      </div>
    );
  }
};

export { PlaylistSongs };
