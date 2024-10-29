import "./UserInfo.scss";
import Avatar from "../../../../assets/chat/avatar.png";
import More from "../../../../assets/chat/more.png";
import Video from "../../../../assets/chat/video.png";
import Edit from "../../../../assets/chat/edit.png";

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src={Avatar} alt="" />
        <h2>John Doe</h2>
      </div>
      <div className="icons">
        <img src={More} alt="" />
        <img src={Video} alt="" />
        <img src={Edit} alt="" />
      </div>
    </div>
  );
};

export default UserInfo;
