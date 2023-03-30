import React from "react";
import "./MainElements.scss";
import { MainFirstBlock, MainSecondBlock } from "../index";

const MainElements = () => {
  return (
    <div className="main-elements">
      <div className="main-elements__container">
        <MainFirstBlock />
        <MainSecondBlock title={"Przygotowano dla Karol Bialuk"} />
        <MainSecondBlock title={"Internetowe gwiazdy i viralowe hity"} />
        <MainSecondBlock title={"Ostatnio odtwarzane"} />
      </div>
    </div>
  );
};

export { MainElements };
