import React from "react";
import "./SearchElements.scss";
import { MainSearchBlock, Main } from "../MainSearchBlock/MainSearchBlock";

const SearchElements = ({ token }) => {
  return (
    <div className="search-elements">
      <div className="search-elements__container">
        <MainSearchBlock token={token} />
      </div>
    </div>
  );
};

export { SearchElements };
