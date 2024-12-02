import React, { useState } from "react";
import "./NavBar.scss";

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { icon: "🏠", label: "Home" },
    { icon: "📈", label: "Stats" },
    { icon: "📊", label: "Charts" },
    { icon: "👤", label: "Profile" },
  ];

  return (
    <div className="navbar">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`navbar-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => setActiveIndex(index)}
        >
          <span className="icon">{item.icon}</span>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
