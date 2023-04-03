import React from "react";

const LeftSidePlaylists = ({ album }) => {
  return (
    <>
      <div className="sidebar__element">
        <div className="sidebar__main-element-text">{album.name}</div>
      </div>
    </>
  );
};

export default LeftSidePlaylists;
