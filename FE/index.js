const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
const express = require('express');
const app = express();

// 📌 JSON 파싱 설정
app.use(express.json());

// 📌 루트 라우터
app.get('/', (req, res) => {
  res.send('서버 실행 중!');
});

// 📌 질문 응답 API
app.post('/ask', (req, res) => {
  const { question } = req.body;
  const answer = `당신의 질문은 '${question}' 이군요. 대답은 아직 비밀입니다 😉`;

  res.json({ answer });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 에서 서버 실행 중`);
});
