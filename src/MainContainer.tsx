import React from "react";
import "./App.css";
import "./MainAndWeatherDetailsContainers.css";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

interface MainContainer {
  uiText: string | undefined;
  jacket: boolean | undefined;
}

const MainContainer: React.FC<MainContainer> = ({ uiText, jacket }) => {
  return (
    <div className="main-container">
      <div className="container" id="main-container">
        <h2>{uiText}</h2>
        {jacket === true ? (
          <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
        ) : (
          <BsFillXCircleFill className="icon"></BsFillXCircleFill>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
