import { React, useState } from "react";
import "./Navbar.scss";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiBold } from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeSearch } from "../../store";
const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value);
    dispatch(changeSearch(e.target.value));
  };

  console.log(search);

  if (window.location.pathname === "/search") {
    return (
      <div className="searchbar">
        <div className="searchbar__container">
          <div className="searchbar__search">
            <input
              onChange={(e) => searchHandler(e)}
              className="searchbar__input"
              type="text"
              placeholder="Szukaj"
            />
          </div>
        </div>
      </div>
    );
  } else {
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
  }
};

export { Navbar };
