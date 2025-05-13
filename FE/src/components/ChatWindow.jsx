import ChatBubble from "./ChatBubble";

function ChatWindow() {
    const messages = [
        { sender: 'user', text: '안녕?' },
        { sender: 'ai', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { sender: 'user', text: '오늘 공대 식단 알려줘' },
        { sender: 'ai', text: '미소된장국, 잡곡밥, 오뎅볶음이 석식으로 준비되어 있습니다:)'}
    ];

    return (
        <div style={{ padding: '10px' }}>
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} sender={msg.sender} message={msg.text} />
          ))}
        </div>
      );
}

export default ChatWindow;
    