import React from "react";
import "./MainFirstBlock.scss";
import { AiFillHeart } from "react-icons/ai";
import FirstBlockItem from "./FirstBlockItem";
import { Link } from "react-router-dom";

const MainFirstBlock = ({ token, query }) => {
  const { data, error, isFetching } = query(token);

  let content;
  if (isFetching) {
    content = <div>Ładowanie</div>;
  } else if (error) {
    content = <div>Błąd podczas ładowania</div>;
  } else {
    content = data.playlists.items.map((album) => {
      return (
        <>
          <Link to={"/playlist/" + album.id}>
            <FirstBlockItem key={album.id} album={album} />
          </Link>
        </>
      );
    });
  }

  return (
    <div className="main-first-block">
      <h1>Dobry wieczór</h1>
      <div className="main-first-block__container">{content}</div>
    </div>
  );
};

export { MainFirstBlock };
