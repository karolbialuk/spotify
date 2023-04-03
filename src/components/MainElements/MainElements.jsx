import React from "react";
import "./MainElements.scss";
import { MainFirstBlock, MainSecondBlock } from "../index";
import {
  useFetchFeaturedPlaylistsQuery,
  useFetchCategoryPlaylistsQuery,
} from "../../store";

const MainElements = ({ token }) => {
  return (
    <div className="main-elements">
      <div className="main-elements__container">
        <MainFirstBlock token={token} query={useFetchFeaturedPlaylistsQuery} />
        <MainSecondBlock
          token={token}
          title={"Polski rap"}
          query={useFetchCategoryPlaylistsQuery}
          category={"hiphop"}
        />
        <MainSecondBlock
          token={token}
          title={"Letnie playlisty"}
          query={useFetchCategoryPlaylistsQuery}
          category={"summer"}
        />
        <MainSecondBlock
          token={token}
          title={"Wycziluj mordeczko"}
          query={useFetchCategoryPlaylistsQuery}
          category={"chill"}
        />
        <MainSecondBlock
          token={token}
          title={"Na siłownie"}
          query={useFetchCategoryPlaylistsQuery}
          category={"workout"}
        />
        <MainSecondBlock
          token={token}
          title={"Muzyka elektroniczna"}
          query={useFetchCategoryPlaylistsQuery}
          category={"rock"}
        />
      </div>
    </div>
  );
};

export { MainElements };
