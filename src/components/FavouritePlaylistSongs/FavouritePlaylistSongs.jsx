import { React, useState, useEffect } from "react";
import "./FavouritePlaylistSongs.scss";
import { BsFillTriangleFill } from "react-icons/bs";
import { SongsList } from "../SongsList/SongsList";
import {
  useFetchLikedSongsQuery,
  usePlayClickedSongMutation,
} from "../../store";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { changeId, changePlay } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

const FavouritePlaylistSongs = ({ token }) => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState();
  // const { data, isFetching, error } = useFetchLikedSongsQuery({
  //   token,
  //   offset,
  // });

  const fetchData = async (newOffset) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: "50",
          offset: newOffset,
        },
        market: "PL",
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dispatch = useDispatch();
  const location = useLocation();

  const [playSong, playSongResults] = usePlayClickedSongMutation();

  const incOff = () => {
    const newOffset = offset + 50;
    if (newOffset <= data.total) {
      setOffset(newOffset);
      fetchData(newOffset);
    }
  };

  const decOff = () => {
    const newOffset = offset - 50;
    if (newOffset >= 0) {
      setOffset(newOffset);
      fetchData(newOffset);
    }
  };

  const player_id = useSelector((state) => {
    return state.uri.id;
  });

  const play_status = useSelector((state) => {
    return state.uri.play;
  });

  const handlePlayMusic = () => {
    const uri = data && data.items.map((item) => item.track.uri);
    console.log(uri);
    if (!player_id && !play_status) {
      dispatch(changeId(uri));
      dispatch(changePlay(true));
    } else if (player_id) {
      playSong({ uri, token });
    }
  };

  return (
    <div className="favourite-playlist-songs">
      <div className="favourite-playlist-songs__container">
        <div className="favourite-playlist-songs__header">
          <div className="favourite-playlist-songs__img">
            <img
              src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
              alt="favourite"
            />
          </div>
          <div className="favourite-playlist-songs__text">
            <h3>Playlista</h3>
            <h1>Polubione utwory</h1>
            <div className="favourite-playlist-songs__text-bottom">
              tu będzie imie i nazwisko
            </div>
          </div>
        </div>
        <div className="favourite-playlist-songs__buttons">
          <button onClick={handlePlayMusic}>
            <div className="favourite-playlist-songs__btn-first">
              <BsFillTriangleFill
                size={20}
                style={{ bottom: "2px", position: "relative" }}
              />
            </div>
          </button>
          <div className="favourite-playlist-songs__bottom-arrows">
            {offset >= 50 && (
              <div>
                <AiFillCaretLeft
                  onClick={decOff}
                  disabled={offset - 50 < 0}
                  size={35}
                  style={{ color: "#fff", cursor: "pointer" }}
                />
              </div>
            )}
            {offset >= 0 && offset < (data && data.total) ? (
              <div>
                <AiFillCaretRight
                  onClick={incOff}
                  disabled={data && offset + 50 > data.total}
                  size={35}
                  style={{ color: "#fff", cursor: "pointer" }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <SongsList data={data} token={token} />
      </div>
    </div>
  );
};

export { FavouritePlaylistSongs };
