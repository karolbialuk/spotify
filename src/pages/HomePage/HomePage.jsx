import { React } from "react";

import {
  Player,
  LeftSidebar,
  MainElements,
  Navbar,
} from "../../components/index";
import "./HomePage.scss";

const HomePage = ({ token }) => {
  if (localStorage.getItem("accessToken")) {
    return (
      <>
        <div className="root">
          <LeftSidebar token={token} />
          <div className="root__main-container">
            <Navbar />
            <MainElements token={token} />
          </div>
        </div>
        <Player token={token} />
      </>
    );
  } else {
    window.location.replace("/");
  }
};

export { HomePage };
