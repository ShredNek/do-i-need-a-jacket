import React from "react";
import "./styles/App.css";
import "./styles/LoadingScreen.css";

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-container">
      <h2>Loading your weather</h2>
      <div className="loading-circle"></div>
    </div>
  );
};

export default LoadingScreen;
