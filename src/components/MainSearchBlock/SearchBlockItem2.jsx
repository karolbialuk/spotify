import React from "react";
import { useFetchSearchItemsQuery } from "../../store";
const SearchBlockItem2 = ({ token, search }) => {
  const { data, isFetching, error } = useFetchSearchItemsQuery({
    token,
    search,
    type: "artist",
  });

  let content;

  if (isFetching) {
    content = <div>Ładowanie</div>;
  } else if (error) {
    content = <div>Wystąpił błąd</div>;
  } else {
    content =
      data.artists &&
      data.artists.items.slice(0, 7).map((artist) => {
        return (
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
