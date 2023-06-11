import { React, useState, useEffect } from "react";
import "./SongsList.scss";
import { BsClock } from "react-icons/bs";
import SongListItem from "./SongListItem";

const SongsList = ({ data, token }) => {
  let number = 0;
  const location = window.location.href.split("/")[3];

  let content;
  if (location === "favourite") {
    content =
      data &&
      data.items.map((songs) => {
        return (
          <>
            <SongListItem
              key={songs.id}
              token={token}
              songs={songs}
              number={(number += 1)}
            />
          </>
        );
      });
  } else {
    content =
      data &&
      data.tracks.items.map((songs) => {
        return (
          <>
            <SongListItem
              key={songs.id}
              token={token}
              songs={songs}
              number={(number += 1)}
            />
          </>
        );
      });
  }

  if (data) {
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
  }
};

export { SongsList };
