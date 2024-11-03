import React from "react";
import "./Detail.scss";
import Avatar from "../../../assets/chat/avatar.png";
import ArrowUp from "../../../assets/chat/arrowUp.png";
import ArrowDown from "../../../assets/chat/arrowDown.png";
import Download from "../../../assets/chat/download.png";

const Detail = () => {
  return (
    <div className="detail">
      <div className="detail-user">
        <img src={Avatar} alt="Avatar" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="detail-info">
        <div className="detail-option">
          <div className="detail-title">
            <span>Chat Settings</span>
            <img src={ArrowUp} alt="Arrow Up" />
          </div>
          <div className="detail-title">
            <span>Privacy & Help</span>
            <img src={ArrowUp} alt="Arrow Up" />
          </div>
          <div className="detail-title">
            <span>Shared photos</span>
            <img src={ArrowDown} alt="ArroDown" />
          </div>
          <div className="detail-photos">
            <div className="detail-photo-item">
              <img src={Avatar} alt="Avatar" />
              <span>photo</span>
            </div>
            <img src={Download} alt="Download" />
          </div>
          <div className="detail-title">
            <span>Shared Files</span>
            <img src={ArrowUp} alt="Arrow Up" />
          </div>
        </div>
        <button>Block User</button>
      </div>
    </div>
  );
};

export default Detail;
