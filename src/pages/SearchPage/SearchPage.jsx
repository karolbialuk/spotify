import React from "react";
import "./SearchPage.scss";
import { LeftSidebar, Navbar, Player, SearchElements } from "../../components";

const SearchPage = ({ token }) => {
  if (localStorage.getItem("accessToken")) {
    return (
      <>
        <div className="root">
          <LeftSidebar token={token} />
          <div className="root__main-container">
            <Navbar token={token} />
            <SearchElements token={token} />
          </div>
        </div>
        <Player token={token} />
      </>
    );
  } else {
    window.location.href = "/";
  }
};

export { SearchPage };
