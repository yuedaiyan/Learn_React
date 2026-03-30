import { useAutoScroll } from "./useAutoScroll";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css"

// 渲染函数 → 传入的是历史的聊天记录
function ChatMessages({ chatMessages }) {
    // 创建一个 ref
    const chatMessageRef = useAutoScroll(chatMessages);

    return (
        <div
            className="chat-message-container"
            // 将 ref 挂载
            // ref={chatMessageRef}
            ref={chatMessageRef}>
            {chatMessages.map((chatMessage) => {
                // 将历史记录中的消息逐个渲染
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    );
}

export default ChatMessages;
