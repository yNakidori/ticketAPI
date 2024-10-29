import "./ChatList.scss";
import Search from "../../../../assets/chat/search.png";
import Plus from "../../../../assets/chat/plus.png";

const ChatList = () => {
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={Search} alt="" className="searchIcon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <img src={Plus} alt="" className="plusIcon" />
    </div>
  );
};

export default ChatList;
