import { React, useEffect, useState } from "react";
import "./PlaylistPage.scss";
import { LeftSidebar, Navbar, Player, PlaylistSongs } from "../../components";
import { useFetchDevicesQuery } from "../../store";
import { Location, useLocation } from "react-router-dom";
import { useActivateDeviceMutation } from "../../store";
import axios from "axios";

const PlaylistPage = ({ token }) => {
  if (localStorage.getItem("accessToken")) {
    return (
      <>
        <div className="root">
          <LeftSidebar token={token} />
          <div className="root__main-container">
            <Navbar />
            <PlaylistSongs token={token} />
          </div>
        </div>
        <Player token={token} />
      </>
    );
  } else {
    window.location.replace("/");
  }
};

export { PlaylistPage };
