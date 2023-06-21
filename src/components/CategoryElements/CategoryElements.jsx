import React from "react";
import { MainSecondBlock } from "../index";
import { useFetchCategoryPlaylistsQuery } from "../../store";
import "./CategoryElements.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryElements = ({ token }) => {
  const location = useLocation();
  const category = useSelector((state) => {
    return state.category.category;
  });

  console.log(category.name);

  const id = location.pathname.split("/")[2];
  return (
    <div className="category-elements">
      <div className="category-elements__container">
        <MainSecondBlock
          token={token}
          title={category.name}
          query={useFetchCategoryPlaylistsQuery}
          category={id}
        />
      </div>
    </div>
  );
};

export { CategoryElements };
