import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import './ChatMessage.css'

// 传入一条消息 进行渲染
export function ChatMessage({ message, sender }) {
    return (
        <div className={sender === "user" ? "chat-message-user" : "chat-message-robot"}>
            {sender === "robot" && (
                <img
                    className="chat-message-profile"
                    src={RobotProfileImage}
                />
            )}
            <div className="chat-message-text">{message}</div>
            {sender === "user" && (
                <img
                    className="chat-message-profile"
                    src={UserProfileImage}
                />
            )}
        </div>
    );
}
