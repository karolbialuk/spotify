import { React, useState, useEffect } from "react";
import "./SongsList.scss";
import { BsClock } from "react-icons/bs";
import SongListItem from "./SongListItem";
import { useFetchPlaylistSongsQuery } from "../../store";

const SongsList = ({ data2, isFetching2, error2, token }) => {
  let number = 0;

  let content;
  if (isFetching2) {
    content = <div>Ładowanie</div>;
  } else if (error2) {
    content = <div>Wystąpił błąd</div>;
  } else {
    content = data2.tracks.items.map((songs) => {
      return (
        <>
          <SongListItem key={songs.id} songs={songs} number={(number += 1)} />
        </>
      );
    });
  }

  return (
    <div className="songs-list">
      <div className="songs-list__container">
        <div className="songs-list__list-names">
          <div className="songs-list__list-first">
            <div>#</div>
            <div>Tytuł</div>
          </div>
          <div className="songs-list__list-second">Album</div>
          <div className="songs-list__list-third">
            <BsClock size={18} />
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};

export { SongsList };
