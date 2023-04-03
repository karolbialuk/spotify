import React from "react";
import { AiFillHeart } from "react-icons/ai";

const FirstBlockItem = ({ album }) => {
  return (
    <div className="main-first-block__element">
      <div className="main-first-block__element-img">
        <img src={album.images[0].url} />
      </div>
      <div className="main-first-block__element-text">{album.description}</div>
    </div>
  );
};

export default FirstBlockItem;
