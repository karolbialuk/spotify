import React from "react";
import "./MainSecondBlock.scss";
import SecondBlockItem from "./SecondBlockItem";

const MainSecondBlock = ({ title, token, query, category }) => {
  const { data, isFetching, error } = query({ token, category });
  let content;
  if (isFetching) {
    content = <div>Ładowanie</div>;
  } else if (error) {
    content = <div>Błąd podczas ładowania</div>;
  } else {
    content = data.playlists.items.map((album) => {
      return (
        <>
          <SecondBlockItem key={album.id} album={album} />
        </>
      );
    });
  }

  return (
    <div className="main-second-block">
      <h1>{title}</h1>
      <div className="main-second-block__container">{content}</div>
    </div>
  );
};

export { MainSecondBlock };
