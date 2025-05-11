const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

// 서버 포트 설정
const PORT = process.env.PORT || 3000;

// HTML 파일을 서빙하는 설정
app.use(express.static(path.join(__dirname, 'public')));

// 인증 API 처리
let keys = require('./keys.json');
app.get('/verify', (req, res) => {
  const key = req.query.key;
  if (!key) return res.json({ status: "error", message: "no key" });

  const state = keys[key];
  if (state === "active" || state === "temp") {
    return res.json({ status: "ok" });
  } else {
    return res.json({ status: "denied" });
  }
});

// 기본 라우트 (HTML 파일 서빙)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 실행
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
