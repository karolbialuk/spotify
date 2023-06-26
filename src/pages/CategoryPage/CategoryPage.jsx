import React from "react";
import "./CategoryPage.scss";

import {
  Player,
  LeftSidebar,
  MainElements,
  Navbar,
  CategoryElements,
} from "../../components/index";

const CategoryPage = ({ token }) => {
  if (localStorage.getItem("accessToken")) {
    return (
      <>
        <div className="root">
          <LeftSidebar token={token} />
          <div className="root__main-container">
            <Navbar token={token} />
            <CategoryElements token={token} />
          </div>
        </div>
        <Player token={token} />
      </>
    );
  } else {
    window.location.href = "/";
  }
};

export { CategoryPage };
