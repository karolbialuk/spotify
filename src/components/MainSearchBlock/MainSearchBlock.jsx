import { React, useState, useEffect } from "react";
import "./MainSearchBlock.scss";
import { SearchBlockItem } from "./SearchBlockItem";
import { useFetchCategoriesQuery } from "../../store";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useFetchSearchItemsQuery,
  useFetchCategoryPlaylistsQuery,
  useFetchAlbumInfoQuery,
} from "../../store";
import axios from "axios";
import { MainSecondBlock } from "../MainSecondBlock/MainSecondBlock";
import { SearchBlockItem2 } from "./SearchBlockItem2";
import { SearchSongListItem } from "./SearchSongListItem";

const MainSearchBlock = ({ token }) => {
  const { data, isFetching, error } = useFetchCategoriesQuery(token);

  let number = 0;
  const search = useSelector((state) => {
    return state.search.search;
  });

  const {
    data: data2 = data,
    isFetching: isFetching2 = isFetching,
    error: error2 = error,
  } = useFetchSearchItemsQuery({ token, search, type: "album" });

  const {
    data: data3 = data,
    isFetching: isFetching3 = isFetching,
    error: error3 = error,
    refetch,
  } = useFetchSearchItemsQuery({ token, search, type: "track" });

  let content;
  let content2;

  if (isFetching) {
    content = <div>Ładowanie</div>;
  } else if (error) {
    content = <div>Wystąpił błąd</div>;
  } else if (search) {
    content =
      data2.albums &&
      data2.albums.items.map((album) => {
        return (
          <Link className="main-search-block__link" to={"/album/" + album.id}>
            <div className="main-search-block__content1-container">
              <div className="main-search-block__content1-img">
                <img
                  src={album.images && album.images[1].url}
                  alt={album.name}
                />
              </div>
              <div className="main-search-block__content1-name">
                {album.name}
              </div>
              <div className="main-search-block__content1-author">
                {"Autor: "}
                {album.artists &&
                  album.artists.map((artist) => {
                    return artist.name;
                  })}
              </div>
            </div>
          </Link>
        );
      });

    content2 = (
      <div className="main-search-block__content2-container">
        {data3.tracks &&
          data3.tracks.items.slice(0, 4).map((track) => {
            return (
              <SearchSongListItem
                track={track}
                token={token}
                refetch={refetch}
                search={search}
              />
            );
          })}
      </div>
    );
  } else {
    content =
      data &&
      data.categories.items.map((category) => {
        return (
          <>
            <Link to={"/category/" + category.id}>
              <SearchBlockItem
                key={category.id}
                category={category}
                search={search}
              />
            </Link>
          </>
        );
      });
  }

  if (search) {
    return (
      <div className="main-search-block">
        <div className="main-search-block__elements-container">
          <div className="main-search-block__container2">
            <div className="main-search-block__container2-title">
              Najlepszy wynik
            </div>
            {content && content[0]}
          </div>
          <div className="main-search-block__container1">
            <div className="main-search-block__container2-title">Utwory</div>
            {content2 && content2}
          </div>
        </div>
        <SearchBlockItem2 token={token} search={search} />
        <MainSecondBlock
          token={token}
          title={"Albumy"}
          query={useFetchSearchItemsQuery}
          search={search}
          type={"album"}
        />
        <MainSecondBlock
          token={token}
          title={"Playlisty"}
          query={useFetchSearchItemsQuery}
          search={search}
          type={"playlist"}
        />
        {/* <MainSecondBlock
          token={token}
          title={"Podcasty"}
          query={useFetchSearchItemsQuery}
          search={search}
          type={"show"}
        />
        <MainSecondBlock
          token={token}
          title={"Odcinki"}
          query={useFetchSearchItemsQuery}
          search={search}
          type={"episode"}
        /> */}
      </div>
    );
  } else {
    return (
      <div className="main-search-block">
        <div className="main-search-block__container">{content}</div>
      </div>
    );
  }
};

export { MainSearchBlock };
