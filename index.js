// 필요한 모듈들을 가져옵니다.
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // CORS 허용을 위해 필요합니다.

// .env 파일에서 환경 변수를 불러옵니다. (로컬 테스트용)
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors({ origin: '*' })); // 모든 출처에서 접근 허용
app.use(express.json()); // JSON 형식의 요청 본문(body)을 파싱합니다.

// Nodemailer를 사용하여 이메일 전송 객체(transporter)를 생성합니다.
// 이 정보는 Railway 대시보드에서 환경 변수로 설정해야 합니다.
const transporter = nodemailer.createTransport({
  service: 'gmail', // 예시: Gmail 서비스
  auth: {
    user: process.env.EMAIL_USER, // Railway 환경 변수: 이메일 주소
    pass: process.env.EMAIL_PASS, // Railway 환경 변수: 이메일 앱 비밀번호
  },
});

// 이메일 전송을 위한 API 엔드포인트
app.post('/api/send-email', (req, res) => {
  const { to, subject, html } = req.body;

  // 이메일 내용
  const mailOptions = {
    from: process.env.EMAIL_USER, // 발신자
    to, // 수신자
    subject, // 제목
    html, // HTML 형식의 본문
  };

  // 이메일 전송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('이메일 전송 실패:', error);
      res.status(500).json({ success: false, message: '이메일 전송 실패', error: error.message });
    } else {
      console.log('이메일 전송 성공:', info.response);
      res.status(200).json({ success: true, message: '이메일이 성공적으로 전송되었습니다.' });
    }
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
