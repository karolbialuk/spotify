import { React, useState } from "react";
import "./FavouritePlaylistSongs.scss";
import { BsFillTriangleFill } from "react-icons/bs";
import { SongsList } from "../SongsList/SongsList";
import { useFetchLikedSongsQuery } from "../../store";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { changeId, changePlay } from "../../store";
import { useDispatch } from "react-redux";

const FavouritePlaylistSongs = ({ token }) => {
  const [offset, setOffset] = useState(0);
  const { data, isFetching, error } = useFetchLikedSongsQuery({
    token,
    offset,
  });

  const dispatch = useDispatch();

  const incOff = () => {
    const newOffset = offset + 50;
    if (newOffset <= data.total) {
      setOffset(newOffset);
    }
  };

  const decOff = () => {
    const newOffset = offset - 50;
    if (newOffset >= 0) {
      setOffset(newOffset);
    }
  };

  const handleChangeUri = (id) => {
    dispatch(changeId(id));
  };

  console.log({ ezez: data });

  const handlePlayMusic = () => {
    const id = data.items.map((item) => item.track.uri);
    console.log(id);

    handleChangeUri(id);
    dispatch(changePlay(true));
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
            <div>
              <AiFillCaretRight
                onClick={incOff}
                disabled={data && offset + 50 > data.total}
                size={35}
                style={{ color: "#fff", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>

        <SongsList
          data={data}
          isFetching={isFetching}
          error={error}
          token={token}
        />
      </div>
    </div>
  );
};

export { FavouritePlaylistSongs };
