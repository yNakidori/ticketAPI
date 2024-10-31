import "./Chat.scss";
import Avatar from "../../../assets/chat/avatar.png";
import Phone from "../../../assets/chat/phone.png";
import Video from "../../../assets/chat/video.png";
import Info from "../../../assets/chat/info.png";
import Emoji from "../../../assets/chat/emoji.png";
import Img from "../../../assets/chat/img.png";
import Camera from "../../../assets/chat/camera.png";
import Mic from "../../../assets/chat/mic.png";

const Chat = () => {
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={Avatar} alt="" />
          <span>Username</span>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="icons">
          <img src={Phone} alt="" />
          <img src={Video} alt="" />
          <img src={Info} alt="" />
        </div>
      </div>

      <div className="center"></div>

      <div className="bottom">
        <div className="icons">
          <img src={Img} alt="" />
          <img src={Camera} alt="" />
          <img src={Mic} alt="" />
        </div>
        <input type="text" placeholder="Type a message" />
        <div className="emoji">
          <img src={Emoji} alt="" />
        </div>
        <div className="sendButton">Send</div>
      </div>
    </div>
  );
};

export default Chat;
