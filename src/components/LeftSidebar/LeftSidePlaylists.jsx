import React from "react";
import { useLocation } from "react-router-dom";

const LeftSidePlaylists = ({ album }) => {
  const location = useLocation();
  const href = location.pathname.split("/")[1];

  return (
    <>
      <div className="sidebar__element">
        <div className="sidebar__main-element-text">
          {album?.name}
          {album?.album?.name}
        </div>
      </div>
    </>
  );
};

export default LeftSidePlaylists;
