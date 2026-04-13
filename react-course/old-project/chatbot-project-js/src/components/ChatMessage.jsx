import dayjs from "dayjs";
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/yuedaiyan.jpg";
import "./ChatMessage.css";

// 传入一条消息 进行渲染
export function ChatMessage({ message, sender, time }) {
    return (
        <div className={sender === "user" ? "chat-message-user" : "chat-message-robot"}>
            {sender === "robot" && (
                <img
                    className="chat-message-profile"
                    src={RobotProfileImage}
                />
            )}
            <div className="chat-message-text">
                {message}
                <div className="chat-message-time">{dayjs(time).format("h:mm a")}</div>
            </div>
            {sender === "user" && (
                <img
                    className="chat-message-profile"
                    src={UserProfileImage}
                />
            )}
        </div>
    );
}
