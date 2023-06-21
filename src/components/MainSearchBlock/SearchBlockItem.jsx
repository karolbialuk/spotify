import React from "react";
import "./MainSearchBlock.scss";
import { changeCategory } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SearchBlockItem = ({ category }) => {
  const dispatch = useDispatch();

  const handleCategory = () => {
    dispatch(changeCategory(category));
    console.log("handled");
  };

  return (
    <div onClick={handleCategory} className="main-search-block__element">
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
