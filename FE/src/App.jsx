import { useState } from 'react';
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import InputArea from './components/InputArea'

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);

    const res = await fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { sender: 'ai', text: data.answer }]);
  };

  return (
    <div>
      <Header />
      <ChatWindow messages={messages} />
      <InputArea onSend={handleSend} />
    </div>
  );
}

export default App;
