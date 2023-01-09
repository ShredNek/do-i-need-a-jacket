import React from "react";

interface MainContainer {
  uiText: string | undefined;
}

const MainContainer: React.FC<MainContainer> = ({ uiText }) => {
  return (
    <div>
      {uiText !== undefined ? (
        <div className="container" id="main-container">
          <h2>{uiText}</h2>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainContainer;
