import { useState } from 'react';

function InputArea({ onSend }) {
  const [text, setText] = useState('');

  const handleClick = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={text}
        placeholder="메시지를 입력하세요"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleClick}>전송</button>
    </div>
  );
}

export default InputArea;
