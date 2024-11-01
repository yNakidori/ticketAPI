import React, { useState } from "react";
import Search from "../../../../assets/chat/search.png";
import Plus from "../../../../assets/chat/plus.png";
import Minus from "../../../../assets/chat/minus.png";
import "./ChatList.scss";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const handleIconClick = () => {
    setAddMode((prev) => !prev);
  };
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={Search} alt="search" className="search-icon" />
          <input type="text" placeholder="Search" className="input" />
        </div>
        <img
          src={addMode ? Minus : Plus}
          alt="plus"
          className={`plusIcon ${addMode ? "minus-icon" : "plus-icon"}`}
          onClick={handleIconClick}
        />
      </div>
    </div>
  );
};

export default ChatList;
