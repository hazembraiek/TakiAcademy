import React, { useRef } from "react";
import Card from "../../UI/Card";
import exit from "./../../Assets/Icons/xmark-solid.svg";
import avatar from "./../../Assets/Images/avatar-1577909_960_720.webp";
import face from "./../../Assets/Icons/face-smile-regular.svg";
import send from "./../../Assets/Icons/paper-plane-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { messageType } from "../../models/ComponentsTypes";
import { MessageAction } from "../../Store/Slices/Messages";

function Chat({ className }) {
  let MsgValue = useRef<HTMLInputElement | null>(null);
  const Messages = useSelector<RootState, messageType[]>(
    (state) => state.Messages.Messages
  );
  const dispatch = useDispatch();
  const SendMessage = () => {
    const date = `${new Date(Date.now()).toLocaleDateString()} ${new Date(
      Date.now()
    ).getHours()}:${new Date(Date.now()).getMinutes()}`;
    let msg = MsgValue.current?.value!;
    if (msg.trim() !== "")
      dispatch(MessageAction.setMessage({ msg, date, sender: true }));
  };
  return (
    <Card className={`chat ${className}`}>
      <div className="chat__headaer">
        <div className="info">
          <p>
            Des questions ? Discutons !
            <span onClick={() => dispatch(MessageAction.ToggleChat())}>
              <img src={exit} alt="" className="smallSizeImg" />
            </span>
          </p>
          <p>Réponse sous 1 heure</p>
        </div>
        <div className="chat__peopel">
          <ul>
            <li>
              <img src={avatar} alt="" className="resizeImg" />
            </li>
            <li>
              <img src={avatar} alt="" className="resizeImg" />
            </li>
            <li>
              <img src={avatar} alt="" className="resizeImg" />
            </li>
            <li>52+</li>
          </ul>
        </div>
      </div>
      <section>
        {Messages.map((msg, i) => {
          return (
            <div className={`msg ${msg.sender ? "me" : "other"}`} key={i}>
              <p>{msg.msg}</p>
              <span>{msg.date}</span>
            </div>
          );
        })}
      </section>
      <div className="chat__discussion">
        <input
          type="text"
          placeholder="Enter votre message..."
          ref={MsgValue}
        />
        <div className="im-send">
          <span className="im">
            <img src={face} alt="" className="mediumSizeImg" />
          </span>
          <span className="send">
            <p onClick={SendMessage}>
              <img src={send} alt="" className="smallSizeImg" />
            </p>
          </span>
        </div>
      </div>
    </Card>
  );
}

export default Chat;
