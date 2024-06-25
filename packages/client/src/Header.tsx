import React, { Component } from "react";
import "./Header.css";

const menuItems = ["About me", "Diary", "Guest Book", "Skills"];

class Header extends Component {
  render() {
    return (
      <header className="sticky-header">
        <div className="title">김수민's Portfolio</div>
        <div className="menu">
          {menuItems.map((item, index) => (
            <div className="menu-item" key={index}>
              {item}
            </div>
          ))}
        </div>
      </header>
    );
  }
}

export default Header;
