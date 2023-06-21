import { React, useEffect, useState } from "react";
import "./LeftSidebar.scss";
import { sidebarLogo } from "../../assets/images/index";
import { AiOutlineHome, AiFillPlusSquare } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import { BiLibrary } from "react-icons/bi";
import { BsFillBagHeartFill } from "react-icons/bs";
import LeftSidePlaylists from "./LeftSidePlaylists";
import {
  useFetchUserPlaylistsQuery,
  useFetchUserAlbumsQuery,
  changeRefresh,
} from "../../store";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

let playlistAlbumRefetch;
const LeftSidebar = ({ token }) => {
  const dispatch = useDispatch();
  const { data, error, isFetching, refetch } =
    useFetchUserPlaylistsQuery(token);

  const {
    data: data2 = data,
    isFetching: isFetching2 = isFetching,
    error: error2 = error,
    refetch: refetch2 = refetch,
  } = useFetchUserAlbumsQuery(token);

  playlistAlbumRefetch = () => {
    refetch();
    refetch2();
  };

  // dispatch(changeRefresh(refetch));

  let content;
  let content2;

  if (isFetching && isFetching2) {
    content = <div>Ładowanie</div>;
  } else {
    content = data?.items?.map((album) => {
      return (
        <>
          <Link style={{ textDecoration: "none" }} to={"/playlist/" + album.id}>
            <LeftSidePlaylists key={album.id} album={album} />
          </Link>
        </>
      );
    });
    content2 = data2?.items?.map((album) => {
      return (
        <>
          <Link
            style={{ textDecoration: "none" }}
            to={"/album/" + album?.album?.id}
          >
            <LeftSidePlaylists key={album?.album?.id} album={album.album} />
          </Link>
        </>
      );
    });
  }

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__logo">
          <Link to="/home">
            <img src={sidebarLogo} />
          </Link>
        </div>
        <div className="sidebar__elements-container">
          <div className="sidebar__element">
            <div className="sidebar__main-element-logo">
              <AiOutlineHome size={25} />
            </div>
            <div className="sidebar__main-element-text">Home</div>
          </div>
          <div className="sidebar__element">
            <div className="sidebar__main-element-logo">
              <SlMagnifier size={25} />
            </div>
            <Link style={{ textDecoration: "none" }} to={"/search"}>
              <div className="sidebar__main-element-text">Szukaj</div>
            </Link>
          </div>
          <div className="sidebar__element">
            <div className="sidebar__main-element-logo">
              <BiLibrary size={25} />
            </div>
            <div className="sidebar__main-element-text">Biblioteka</div>
          </div>
        </div>

        <div className="sidebar__elements-container">
          <div className="sidebar__element">
            <div className="sidebar__main-element-logo">
              <AiFillPlusSquare size={25} />
            </div>
            <div className="sidebar__main-element-text">Utwórz playlistę</div>
          </div>
          <div className="sidebar__element">
            <div className="sidebar__main-element-logo">
              <BsFillBagHeartFill size={25} />
            </div>
            <Link style={{ textDecoration: "none" }} to={"/favourite"}>
              <div className="sidebar__main-element-text">Polubione utwory</div>
            </Link>
          </div>
        </div>

        <div className="sidebar__playlist-container">
          <h3>Playlisty</h3>
          {content}
          <h3>Albumy</h3>
          {content2}
        </div>
      </div>
    </div>
  );
};

export { LeftSidebar, playlistAlbumRefetch };
