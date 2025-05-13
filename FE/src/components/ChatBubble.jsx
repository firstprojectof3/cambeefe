function ChatBubble({ sender, message }) {
    const isUser = sender === 'user';
  
    return (
      <div style={{ textAlign: isUser ? 'right' : 'left', margin: '4px 0' }}>
        <span>{message}</span>
      </div>
    );
  }
  
  export default ChatBubble;
  
