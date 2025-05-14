const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const { to, subject, text } = JSON.parse(event.body);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  try {
    await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, text });
    return { statusCode: 200, body: "Email sent!" };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};