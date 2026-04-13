import { useState } from "react";
import { Chatbot } from "supersimpledev";
import React from "react";
import dayjs from "dayjs";
import LoadingSpinnerImage from "../assets/loading-spinner.gif";
import "./ChatInput.css";

type ChatMessages = {
    message: string | React.ReactNode;
    sender: string;
    time?: number;
    id: string;
};

type ChatInputProps = {
    chatMessages: ChatMessages[];
    setChatMessages: (chatMessages: ChatMessages[]) => void;
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
    // console.log("chatMessages:", chatMessages);
    // console.log("setChatMessages:", setChatMessages);

    const [inputText, setInputText] = useState("");
    const [isLoading, setLoading] = useState(false);

    // function saveInputText(event: React.ChangeEvent<HTMLInputElement>) {
    function saveInputText(event: { target: { value: string } }) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        if (isLoading || inputText === "") {
            return;
        }
        setLoading(true);

        // 首先: 清空输入框
        setInputText("");
        // 固定唯一的 robotId
        const robotId = crypto.randomUUID();
        // 先 将之前确定的消息进行拼接
        const newChatMesages = [
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                time: dayjs().valueOf(),
                id: crypto.randomUUID(),
            },
        ];
        let response = "Loading…";

        // 将 Loading… 显示出来
        setChatMessages([
            ...newChatMesages,
            {
                message: (
                    <img
                        className="chat-input-loadingImg"
                        src={LoadingSpinnerImage}
                    />
                ),
                sender: "robot",
                id: robotId,
            },
        ]);

        // 等待后端回复,再次设置聊天框内容
        response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
            // 复制所有旧的消息,添加新的消息
            ...newChatMesages,
            {
                message: response,
                sender: "robot",
                time: dayjs().valueOf(),
                id: robotId,
            },
        ]);

        setLoading(false);
    }

    // function enterDown(event: { _reactName: string, _targetInst: null; type: string; native}) {
    // 对象中嵌套了对象,此种穷举法无法实现
    function enterDown(event: React.KeyboardEvent<HTMLInputElement>) {
        // console.log('event:',event);
        if (event.key === "Enter") {
            sendMessage();
        }
        if (event.key === "Escape") {
            setInputText("");
        }
    }

    function cleanMessages() {
        localStorage.setItem("messages", "[]");
        setChatMessages([]);
    }

    return (
        <div className="chat-input-contaier">
            <input
                className="chat-input"
                placeholder="Send a message to Chatbot"
                size={30}
                onChange={saveInputText}
                value={inputText}
                onKeyDown={enterDown}
            />

            <button
                className="send-button"
                // 一旦发生点击行为 → 执行 sendMeaasge函数
                onClick={sendMessage}
            >
                Send
            </button>
            <button
                className="clear-button"
                onClick={cleanMessages}
            >
                Clear
            </button>
        </div>
    );
}
