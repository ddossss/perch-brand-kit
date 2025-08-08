// server.js

// 1. 필요한 라이브러리 가져오기
const express = require('express');
const cors = require('cors'); // 이 줄을 추가합니다.
require('dotenv').config();
const { Pool } = require('pg');

// 2. Express 앱 생성 및 미들웨어 설정
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // 이 줄을 추가하여 CORS를 활성화합니다.
app.use(express.json());

// 3. PostgreSQL 데이터베이스 연결 설정
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// 데이터베이스 연결 테스트
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database!');
  release();
});

// 4. API 엔드포인트 설정
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// 폼 데이터를 데이터베이스에 저장하는 라우트
app.post('/api/save-brand-data', async (req, res) => {
  const brandData = req.body;
  console.log('Received brand data:', brandData);

  const client = await pool.connect();

  try {
    const insertQuery = `
      INSERT INTO brand_data (
        brand_reason, problem_solving, core_values, customer_feeling, person_demographics,
        tone_of_voice, favorite_styles, catchphrases, customer_attitude, main_color,
        sub_color, accent_color, title_font, body_font, emphasis_font, image_style,
        brand_keywords, brand_slogan, sns_bio, brand_introduction, brand_philosophy,
        customer_demographics, customer_interests, customer_pains, expected_solutions,
        competitor_list, brand_differentiator, brand_niche_position, axis_x, axis_y,
        brand_position, validation_methods, success_metrics, brand_goals, launch_plan,
        growth_plan, milestones_kpis
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
                $31, $32, $33, $34, $35, $36, $37)
      ON CONFLICT DO NOTHING;
    `;
    const values = [
      brandData.step1.brandReason, brandData.step1.problemSolving, brandData.step1.coreValues, brandData.step1.customerFeeling,
      brandData.step2.personDemographics, brandData.step2.toneOfVoice, brandData.step2.favoriteStyles, brandData.step2.catchphrases, brandData.step2.customerAttitude,
      brandData.step3.mainColor, brandData.step3.subColor, brandData.step3.accentColor, brandData.step3.titleFont, brandData.step3.bodyFont, brandData.step3.emphasisFont, brandData.step3.imageStyle,
      brandData.step4.brandKeywords, brandData.step4.brandSlogan, brandData.step4.snsBio, brandData.step4.brandIntroduction, brandData.step4.brandPhilosophy,
      brandData.step5.customerDemographics, brandData.step5.customerInterests, brandData.step5.customerPains, brandData.step5.expectedSolutions,
      brandData.step6.competitorList, brandData.step6.brandDifferentiator, brandData.step6.brandNichePosition, brandData.step7.axisX, brandData.step7.axisY,
      brandData.step7.brandPosition, brandData.step8.validationMethods, brandData.step8.successMetrics,
      brandData.step9.brandGoals, brandData.step9.launchPlan, brandData.step9.growthPlan, brandData.step9.milestonesKpis
    ];

    await client.query(insertQuery, values);
    res.status(200).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving data to database:', error);
    res.status(500).json({ error: 'Failed to save data' });
  } finally {
    client.release();
  }
});

// 이메일 전송 라우트 (프런트엔드에서 호출하는 '/api/send-email' 엔드포인트)
app.post('/api/send-email', async (req, res) => {
  const { to, subject, html } = req.body;
  
  // 실제 이메일 전송 로직이 여기에 들어갑니다.
  // 여기서는 예시로 성공/실패만 반환합니다.
  console.log(`Sending email to: ${to} with subject: ${subject}`);
  // Nodemailer 등의 라이브러리를 사용하여 실제 이메일을 보낼 수 있습니다.
  // 예:
  // try {
  //   const transporter = nodemailer.createTransport({ ... });
  //   await transporter.sendMail({ from: 'your-email@example.com', to, subject, html });
  //   res.json({ success: true, message: 'Email sent successfully!' });
  // } catch (error) {
  //   console.error('Email sending failed:', error);
  //   res.status(500).json({ success: false, message: 'Failed to send email' });
  // }
  
  // 지금은 단순히 성공 메시지를 보냅니다.
  res.json({ success: true, message: 'Email sending simulated successfully!' });
});


// 5. 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});