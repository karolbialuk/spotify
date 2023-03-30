import React from "react";
import "./MainFirstBlock.scss";
import { AiFillHeart } from "react-icons/ai";

const MainFirstBlock = () => {
  return (
    <div className="main-first-block">
      <h1>Dobry wieczór</h1>
      <div className="main-first-block__container">
        <div className="main-first-block__element">
          <div className="main-first-block__element-img">
            <AiFillHeart size={35} />
          </div>
          <div className="main-first-block__element-text">Polubione utwory</div>
        </div>
        <div className="main-first-block__element">
          <div className="main-first-block__element-img">X</div>
          <div className="main-first-block__element-text">asdasd</div>
        </div>
        <div className="main-first-block__element">
          <div className="main-first-block__element-img">X</div>
          <div className="main-first-block__element-text">asdasd</div>
        </div>
        <div className="main-first-block__element">
          <div className="main-first-block__element-img">X</div>
          <div className="main-first-block__element-text">asdasd</div>
        </div>
        <div className="main-first-block__element">
          <div className="main-first-block__element-img">X</div>
          <div className="main-first-block__element-text">asdasd</div>
        </div>
        <div className="main-first-block__element">
          <div className="main-first-block__element-img">X</div>
          <div className="main-first-block__element-text">asdasd</div>
        </div>
      </div>
    </div>
  );
};

export { MainFirstBlock };
