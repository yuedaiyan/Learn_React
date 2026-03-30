// 层级一: 导入 包
import { useState } from "react";
// 层级二: 导入 .jsx 文件
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { WelcomeMessage } from "./components/WelcomeMessage";
// 层级三: 导入 具体文件
// 导入 App.css
import "./App.css";

function App() {
    const [chatMessages, setChatMessages] = useState([]);

    return (
        <div className="app-container">
            <ChatMessages
                // className='chat-mesaaaage'
                chatMessages={chatMessages}
            />
            <WelcomeMessage chatMessages={chatMessages} />
            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
        </div>
    );
}

export default App;
