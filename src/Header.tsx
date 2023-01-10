import React from "react";
import "./App.css";
import "./Divider.css";

interface Header {
  children: JSX.Element;
}

const Header: React.FC<Header> = ({ children }: Header) => {
  return (
    <section className="header-container">
      <nav className="page-header">
        <h1>Do I Need A Jacket?</h1>
        <>{children}</>
      </nav>
      <div className="fader">
        <div className="custom-shape-divider-top-1673263049">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Header;
