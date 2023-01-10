import React from "react";
import "./App.css";
import "./LoadingScreen.css";

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-container">
      <h2>Loading your weather</h2>
      <div className="loading-circle"></div>
    </div>
  );
};

export default LoadingScreen;
