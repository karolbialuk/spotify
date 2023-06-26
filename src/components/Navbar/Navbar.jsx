import { React, useState } from "react";
import "./Navbar.scss";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { changeSearch } from "../../store";
import { useGetCurrentUserQuery } from "../../store";

const Navbar = ({ token }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { data } = useGetCurrentUserQuery(token);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    dispatch(changeSearch(e.target.value));
  };

  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };

  const handleClick = () => {
    const element = document.getElementById("user-element-options");
    element.classList.toggle("active");
  };

  const handleLogout = () => {
    handleClick();
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

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
              <AiOutlineLeft onClick={goBack} />
            </div>
            <div className="navbar__arrow-right">
              <AiOutlineRight onClick={goForward} />
            </div>
          </div>
          <div className="navbar__user-element">
            <div className="navbar__user-element-left">
              <img src={data?.images[0].url} alt={data?.display_name} />
            </div>
            <div className="navbar__user-element-center">
              <h3>{data?.display_name}</h3>
            </div>
            <div className="navbar__user-element-right">
              <RiArrowDropDownFill
                onClick={handleClick}
                className="navbar__user-element-right-icon"
                size={50}
              />
            </div>
            <div
              id="user-element-options"
              className="navbar__user-element-options"
            >
              <div
                onClick={handleLogout}
                className="navbar__user-element-option"
              >
                Wyloguj
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export { Navbar };
