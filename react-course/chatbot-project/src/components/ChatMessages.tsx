import { useAutoScroll } from "./useAutoScroll";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

type ChatMessagesProps = {
    chatMessages: {
        message: string;
        sender: string;
        time: number;
        id: string;
    }[];
};

// 渲染函数 → 传入的是历史的聊天记录
function ChatMessages({ chatMessages }: ChatMessagesProps) {
    // console.log("chatMessages:", chatMessages);
    const chatMessageRef = useAutoScroll(chatMessages);

    return (
        <div
            className="chat-message-container"
            ref={chatMessageRef}
        >
            {chatMessages.map(chatMessage => {
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
