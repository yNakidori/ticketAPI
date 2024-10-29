import "./ChatList.scss";
import Search from "../../../../assets/chat/search.png";
import Avatar from "../../../../assets/chat/avatar.png";
import Plus from "../../../../assets/chat/plus.png";
import Minus from "../../../../assets/chat/minus.png";
import { useState } from "react";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);

  const handleIconClick = () => {
    setAddMode((prev) => !prev);
  };

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={Search} alt="" className="searchIcon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <img
        src={addMode ? Minus : Plus}
        alt=""
        className={`plusIcon ${addMode ? "minusIcon" : ""}`}
        onClick={handleIconClick}
      />
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src={Avatar} alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
