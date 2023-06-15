import React from "react";
import {
  useFetchSearchItemsQuery,
  useFetchRelatedAuthorsQuery,
} from "../../store";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SearchBlockItem2 = ({ token, search, id }) => {
  const location = useLocation();

  let query =
    location.pathname.split("/")[1] === "author"
      ? useFetchRelatedAuthorsQuery
      : useFetchSearchItemsQuery;

  let data, isFetching, error;

  if (location.pathname.split("/")[1] === "author") {
    ({ data, isFetching, error } = query({
      token,
      id,
    }));
  } else {
    ({ data, isFetching, error } = query({
      token,
      search,
      type: "artist",
    }));
  }

  console.log(location.pathname.split("/")[1]);

  let content;

  if (isFetching) {
    content = <div>Ładowanie</div>;
  } else if (error) {
    content = <div>Wystąpił błąd</div>;
  } else if (location.pathname.split("/")[1] === "author") {
    content =
      data &&
      data.artists.slice(0, 7).map((artist) => {
        return (
          <Link to={"/author/" + artist.id}>
            <div className="search-block-item__element">
              <div className="search-block-item__image-container">
                <div className="search-block-item__element-img">
                  <img src={artist.images[1] && artist.images[1].url} />
                </div>
              </div>
              <div className="search-block-item__text-container">
                <div className="search-block-item__element-text">
                  <p>{artist && artist.name}</p>
                </div>
                <div className="search-block-item__element-text2">
                  <p>{artist && artist.type === "artist" ? "wykonawca" : ""}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      });

    return (
      <div className="search-block-item">
        <div className="search-block-item__title">
          {location.pathname.split("/")[1] === "author"
            ? "Powiązani twórcy"
            : "Wykonawcy"}
        </div>
        <div className="search-block-item__container">{content}</div>
      </div>
    );
  } else {
    content =
      data.artists &&
      data.artists.items.slice(0, 7).map((artist) => {
        return (
          <Link to={"/author/" + artist.id}>
            <div className="search-block-item__element">
              <div className="search-block-item__image-container">
                <div className="search-block-item__element-img">
                  <img src={artist.images[1] && artist.images[1].url} />
                </div>
              </div>
              <div className="search-block-item__text-container">
                <div className="search-block-item__element-text">
                  <p>{artist && artist.name}</p>
                </div>
                <div className="search-block-item__element-text2">
                  <p>{artist && artist.type === "artist" ? "wykonawca" : ""}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      });

    return (
      <div className="search-block-item">
        <div className="search-block-item__title">Wykonawcy</div>
        <div className="search-block-item__container">{content}</div>
      </div>
    );
  }
};

export { SearchBlockItem2 };
