import "./WelcomeMessage.css"


export function WelcomeMessage({ chatMessages }) {
    console.log(chatMessages.length);
    if (chatMessages.length === 0) {
        return <p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below.</p>;
    }
}