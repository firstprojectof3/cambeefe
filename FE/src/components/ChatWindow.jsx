import ChatBubble from "./ChatBubble";

function ChatWindow({ messages }) {
    return (
        <div style={{ padding: '10px' }}>
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} sender={msg.sender} message={msg.text} />
          ))}
        </div>
      );
}

export default ChatWindow;
    
