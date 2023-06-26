import { React } from "react";
import "./PlaylistPage.scss";
import { LeftSidebar, Navbar, Player, PlaylistSongs } from "../../components";

const PlaylistPage = ({ token }) => {
  if (localStorage.getItem("accessToken")) {
    return (
      <>
        <div className="root">
          <LeftSidebar token={token} />
          <div className="root__main-container">
            <Navbar token={token} />
            <PlaylistSongs token={token} />
          </div>
        </div>
        <Player token={token} />
      </>
    );
  } else {
    window.location.href = "/";
  }
};

export { PlaylistPage };
