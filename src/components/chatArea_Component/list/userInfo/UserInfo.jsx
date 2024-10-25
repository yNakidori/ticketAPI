import "./UserInfo.scss";

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src="../../../../assets/chat/avatar.png" alt="" />
        <h2>John Doe</h2>
      </div>
      <div className="icons">
        <img src="../../../../assets/chat/more.png" alt="" />
        <img src="../../../../assets/chat/video.png" alt="" />
        <img src="../../../../assets/chat/edit.png" alt="" />
      </div>
    </div>
  );
};

export default UserInfo;
