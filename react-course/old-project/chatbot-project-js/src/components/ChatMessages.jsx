import { useAutoScroll } from "./useAutoScroll";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css"

// 渲染函数 → 传入的是历史的聊天记录
function ChatMessages({ chatMessages }) {
    const chatMessageRef = useAutoScroll(chatMessages);

    return (
        <div
            className="chat-message-container"
            ref={chatMessageRef}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                        time={chatMessage.time}
                    />
                );
            })}
        </div>
    );
}

export default ChatMessages;
