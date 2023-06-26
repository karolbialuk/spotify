import { React } from "react";
import "./SongsList.scss";
import { BsClock } from "react-icons/bs";
import { SongListItem } from "./SongListItem";
import { useLocation } from "react-router-dom";

const SongsList = ({ data, token, albumInfo, refetch }) => {
  const location = useLocation();
  let number = 0;
  let content;
  if (location.pathname.split("/")[1] === "favourite") {
    content = data?.items?.map((song) => {
      return (
        <>
          <SongListItem
            key={song.id}
            token={token}
            song={song}
            number={(number += 1)}
          />
        </>
      );
    });
  } else if (
    location.pathname.split("/")[1] === "playlist" ||
    location.pathname.split("/")[1] === "album"
  ) {
    content = data?.tracks?.items.map((song) => {
      return (
        <>
          <SongListItem
            key={song.id}
            token={token}
            refetch={refetch}
            song={song}
            albumInfo={albumInfo}
            number={(number += 1)}
          />
        </>
      );
    });
  } else if (location.pathname.split("/")[1] === "author") {
    content =
      data &&
      data.tracks.map((song) => {
        return (
          <>
            <SongListItem
              key={song.id}
              token={token}
              song={song}
              albumInfo={albumInfo}
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
