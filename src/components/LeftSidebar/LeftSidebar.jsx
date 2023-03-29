import React from "react";
import "./LeftSidebar.scss";
import { sidebarLogo } from "../../assets/images/index";
import { AiOutlineHome, AiFillPlusSquare } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import { BiLibrary } from "react-icons/bi";
import { BsFillBagHeartFill } from "react-icons/bs";

const LeftSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__logo">
          <img src={sidebarLogo} />
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
            <div className="sidebar__main-element-text">Szukaj</div>
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
            <div className="sidebar__main-element-text">Polubione utwory</div>
          </div>
        </div>

        <div className="sidebar__playlist-container">
          <div className="sidebar__element">
            <div className="sidebar__main-element-text">
              Fajna nazwa playlisty
            </div>
          </div>
          <div className="sidebar__element">
            <div className="sidebar__main-element-text">
              Fajna nazwa playlisty
            </div>
          </div>
          <div className="sidebar__element">
            <div className="sidebar__main-element-text">
              Fajna nazwa playlisty
            </div>
          </div>
          <div className="sidebar__element">
            <div className="sidebar__main-element-text">
              Fajna nazwa playlisty
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LeftSidebar };
