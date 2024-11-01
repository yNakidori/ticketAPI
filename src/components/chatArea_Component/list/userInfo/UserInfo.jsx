import React from "react";
import Avatar from "../../../../assets/chat/avatar.png";
import More from "../../../../assets/chat/more.png";
import Video from "../../../../assets/chat/video.png";
import Edit from "../../../../assets/chat/edit.png";
import "./UserInfo.scss";

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src={Avatar} alt="avatar" className="avatar" />
        <h2>John Doe</h2>
      </div>
      <div className="icons">
        <img src={More} alt="more" className="more" />
        <img src={Video} alt="video" className="video" />
        <img src={Edit} alt="edit" className="edit" />
      </div>
    </div>
  );
};

export default UserInfo;
