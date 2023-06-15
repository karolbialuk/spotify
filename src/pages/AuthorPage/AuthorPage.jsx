import React from "react";
import "./AuthorPage.scss";
import { AuthorElements } from "../../components/index";

import {
  Player,
  LeftSidebar,
  MainElements,
  Navbar,
  CategoryElements,
} from "../../components/index";

const AuthorPage = ({ token }) => {
  if (localStorage.getItem("accessToken")) {
    return (
      <>
        <div className="root">
          <LeftSidebar token={token} />
          <div className="root__main-container">
            <Navbar />
            <AuthorElements token={token} />
          </div>
        </div>
        <Player token={token} />
      </>
    );
  } else {
    window.location.replace("/");
  }
};

export { AuthorPage };
