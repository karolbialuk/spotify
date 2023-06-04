import React from "react";
import "./FavouritePage.scss";
import {
  LeftSidebar,
  Navbar,
  Player,
  FavouritePlaylistSongs,
} from "../../components";

const FavouritePage = ({ token }) => {
  if (localStorage.getItem("accessToken")) {
    return (
      <>
        <div className="root">
          <LeftSidebar token={token} />
          <div className="root__main-container">
            <Navbar />
            <FavouritePlaylistSongs token={token} />
          </div>
        </div>
        <Player token={token} />
      </>
    );
  } else {
    window.location.replace("/");
  }
};

export { FavouritePage };
