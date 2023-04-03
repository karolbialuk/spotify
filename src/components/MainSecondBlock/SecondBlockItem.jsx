import React from "react";

const SecondBlockItem = ({ album }) => {
  return (
    <div className="main-second-block__element">
      <div className="main-second-block__element-img">
        <img src={album.images[0].url} />
      </div>
      <div className="main-second-block__element-content">
        <h2>{album.name}</h2>
        <p>{album.description}</p>
      </div>
    </div>
  );
};

export default SecondBlockItem;
