import React from "react";
import { toCaps } from "./App";

interface Header {
  currentUnitState: string;
  children: JSX.Element;
}

const Header: React.FC<Header> = ({ currentUnitState, children }: Header) => {
  return (
    <nav className="page-header">
      <h1>Do I Need A Jacket?</h1>
      <div id="right-side-container">
        {children}
        <p>Current setting: {toCaps(currentUnitState)}</p>
      </div>
    </nav>
  );
};

export default Header;
