import React from "react";
import "./Navbar.scss";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiBold } from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__arrows">
          <div className="navbar__arrow-left">
            <AiOutlineLeft />
          </div>
          <div className="navbar__arrow-right">
            <AiOutlineRight />
          </div>
        </div>
        <div className="navbar__user-element">
          <div className="navbar__user-element-left"></div>
          <div className="navbar__user-element-center">
            <h3>Karol Bialuk</h3>
          </div>
          <div className="navbar__user-element-right">
            <RiArrowDropDownFill size={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
