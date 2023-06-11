import React from "react";
import "./MainSecondBlock.scss";
import SecondBlockItem from "./SecondBlockItem";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MainSecondBlock = ({ title, token, query, category, search, type }) => {
  const location = useLocation();
  let data, isFetching, error;

  if (location.pathname === "/search") {
    ({ data, isFetching, error } = query({ token, search, type }));
  } else {
    ({ data, isFetching, error } = query({ token, category }));
  }

  console.log({ ezezez: data });

  let content;
  if (isFetching) {
    content = <div>Ładowanie</div>;
  } else if (error) {
    content = <div>Błąd podczas ładowania</div>;
  } else if (location.pathname === "/search" && type === "album") {
    content = data.albums.items.slice(1, 8).map((item) => {
      return (
        <>
          <Link style={{ textDecoration: "none" }} to={"/playlist/" + item.id}>
            <SecondBlockItem key={item.id} data={item} type="album" />
          </Link>
        </>
      );
    });
  } else if (location.pathname === "/search" && type === "playlist") {
    content = data.playlists.items.slice(1, 8).map((item) => {
      return (
        <>
          <Link style={{ textDecoration: "none" }} to={"/playlist/" + item.id}>
            <SecondBlockItem key={item.id} data={item} type="playlist" />
          </Link>
        </>
      );
    });
  } else if (location.pathname === "/search" && type === "show") {
    content = data.shows.items.slice(1, 8).map((item) => {
      return (
        <>
          <Link style={{ textDecoration: "none" }} to={"/playlist/" + item.id}>
            <SecondBlockItem key={item.id} data={item} type="show" />
          </Link>
        </>
      );
    });
  } else if (location.pathname === "/search" && type === "episode") {
    content = data.episodes.items.slice(1, 8).map((item) => {
      return (
        <>
          <Link style={{ textDecoration: "none" }} to={"/playlist/" + item.id}>
            <SecondBlockItem key={item.id} data={item} type="episode" />
          </Link>
        </>
      );
    });
  } else {
    content = data.playlists.items.map((item) => {
      return (
        <>
          <Link style={{ textDecoration: "none" }} to={"/playlist/" + item.id}>
            <SecondBlockItem key={item.id} data={item} />
          </Link>
        </>
      );
    });
  }

  if (!error) {
    return (
      <div className="main-second-block">
        <h1>{title}</h1>
        <div className="main-second-block__container">{content}</div>
      </div>
    );
  }
};

export { MainSecondBlock };
