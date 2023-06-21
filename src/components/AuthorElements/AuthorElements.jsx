import React from "react";
import "./AuthorElements.scss";
import { BsFillTriangleFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useFetchAuthorTopTracksQuery } from "../../store";
import { useLocation } from "react-router-dom";
import { SongsList } from "../SongsList/SongsList";
import { MainSecondBlock } from "../MainSecondBlock/MainSecondBlock";
import { useSelector, useDispatch } from "react-redux";
import { changeId, changePlay } from "../../store";
import { SearchBlockItem2 } from "../MainSearchBlock/SearchBlockItem2";
import {
  usePlayClickedSongMutation,
  useCheckAuthorAlbumsQuery,
  useFetchAuthorQuery,
} from "../../store";

const AuthorElements = ({ token }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, isFetching, error } = useFetchAuthorTopTracksQuery({
    token,
    id,
  });

  const {
    data: data2 = data,
    isFetching: isFetching2 = isFetching,
    error: error2 = error,
  } = useFetchAuthorQuery({ token, id });

  console.log({ dsadasdasa: data2 });

  let imageUrl;
  if (isFetching2) {
    console.log("ładowanie");
  } else {
    imageUrl = data2.images[0] ? data2.images[0].url : "";
  }

  const [playSong, playSongResults] = usePlayClickedSongMutation();

  const href = location.pathname.split("/")[1];

  const player_id = useSelector((state) => {
    return state.uri.id;
  });

  const play_status = useSelector((state) => {
    return state.uri.play;
  });

  const handlePlayMusic = () => {
    const uri = data.tracks.map((item) => item.uri);

    if (!player_id && !play_status) {
      dispatch(changeId(uri));
      dispatch(changePlay(true));
    } else if (play_status) {
      playSong({ uri, token });
    }
  };

  return (
    <div className="author-elements">
      <div className="author-elements__container">
        <div className="author-elements__header">
          <div className="author-elements__img">
            <img src={imageUrl} />
          </div>
          <div className="author-elements__text">
            <h3>
              {location.pathname.split("/")[1] === "author" ? "" : "Playlista"}
            </h3>
            <h1>{data2 && data2.name}</h1>
            <div className="author-elements__text-bottom">
              {location.pathname.split("/")[1] === "author"
                ? data2 && "Obserwujący - " + data2?.followers?.total
                : ""}
            </div>
          </div>
        </div>
        <div className="author-elements__buttons">
          <button onClick={handlePlayMusic}>
            <div className="author-elements__btn-first">
              <BsFillTriangleFill
                size={20}
                style={{ bottom: "2px", position: "relative" }}
              />
            </div>
          </button>
          <div className="author-elements__btn-second">
            <AiOutlineHeart size={40} />
          </div>
          <div className="author-elements__btn-third">
            <BiDotsHorizontalRounded size={40} />
          </div>
        </div>
        <SongsList
          data={data}
          isFetching={isFetching}
          error={error}
          token={token}
        />
        <MainSecondBlock
          token={token}
          title={"Albumy"}
          query={useCheckAuthorAlbumsQuery}
          type={"album"}
          id={id}
        />

        <SearchBlockItem2 token={token} id={id} />
      </div>
    </div>
  );
};

export { AuthorElements };
