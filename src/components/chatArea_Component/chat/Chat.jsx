import React, { useState, useEffect, useRef } from "react";
import Avatar from "../../../assets/chat/avatar.png";
import Phone from "../../../assets/chat/phone.png";
import Video from "../../../assets/chat/video.png";
import Info from "../../../assets/chat/info.png";
import Emoji from "../../../assets/chat/emoji.png";
import Img from "../../../assets/chat/img.png";
import Camera from "../../../assets/chat/camera.png";
import Mic from "../../../assets/chat/mic.png";
import Placeholder from "../../../assets/chat/placeholder.jpeg";
import "./Chat.scss";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="chat-top">
        <div className="chat-user">
          <img src={Avatar} alt="profile pic" className="chat-user-img" />
          <div className="chat-texts">
            <span className="chat-contact">Jane Doe</span>
            <p className="chat-description">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="chat-icons">
          <img src={Phone} alt="phone" className="phone-icon" />
          <img src={Video} alt="video" className="video-icon" />
          <img src={Info} alt="info" className="info-icon" />
        </div>
      </div>
      <div className="chat-center">
        <div className="message-center">
          <img src={Avatar} alt="profile pic" className="chat-user-img" />
          <div className="message-texts">
            <p className="chat-description">Olá! Como vai?</p>
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div className="message-center-own">
          <div className="message-texts">
            <p className="chat-description">Tudo bem! E você?</p>
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div className="message-center-own">
          <div className="message-texts">
            <p className="chat-description">Tudo bem! E você?</p>
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div className="message-center-own">
          <div className="message-texts">
            <p className="chat-description">Tudo bem! E você?</p>
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div className="message-center-own">
          <div className="message-texts">
            <p className="chat-description">Tudo bem! E você?</p>
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div className="message-center-own">
          <div className="message-texts">
            <p className="chat-description">Tudo bem! E você?</p>
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div className="message-center-own">
          <div className="message-texts">
            <p className="chat-description">Tudo bem! E você?</p>
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div className="message-center-own">
          <div className="message-texts">
            <p className="chat-description">Tudo bem! E você?</p>
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div className="message-center-own">
          <div className="message-texts">
            <p className="chat-description">Tudo bem! E você?</p>
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div className="message-center">
          <img src={Avatar} alt="profile pic" className="chat-user-img" />
          <div className="message-texts">
            <p className="chat-description">Eu também! Olha essa foto:</p>
            <img
              src={Placeholder}
              alt="placeholder"
              className="chat-send-img"
            />
            <span className="chat-contact">1 min atrás</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="chat-bottom">
        <div className="bottom-icons">
          <img src={Img} alt="img" className="img-icon" />
          <img src={Camera} alt="camera" className="camera-icon" />
          <img src={Mic} alt="mic" className="mic-icon" />
        </div>
        <input
          type="text"
          placeholder="Type a message"
          className="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src={Emoji}
            alt="emoji"
            className="emoji-icon"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="emoji-picker">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chat;
