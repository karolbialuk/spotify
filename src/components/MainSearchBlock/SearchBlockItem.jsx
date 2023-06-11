import React from "react";
import "./MainSearchBlock.scss";

const SearchBlockItem = ({ category }) => {
  return (
    <div className="main-search-block__element">
      <div className="main-search-block__element-img">
        <img src={category.icons[0].url} />
      </div>
      <div className="main-search-block__element-text">
        <p>{category.name}</p>
      </div>
    </div>
  );
};

export { SearchBlockItem };
