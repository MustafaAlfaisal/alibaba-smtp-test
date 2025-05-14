const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Set CORS headers for browsers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Ensure this is a POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the incoming JSON from the request body
    const data = JSON.parse(event.body);
    const { smtp, email } = data;

    // Validate required parameters
    if (!smtp || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing SMTP or email data' })
      };
    }

    // Configure the mail transporter
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: parseInt(smtp.port),
      secure: smtp.port === '465', // true for port 465, false for other ports
      auth: {
        user: smtp.user,
        pass: smtp.pass
      }
    });

    // Set up email options
    const mailOptions = {
      from: email.fromName ? `"${email.fromName}" <${email.fromEmail}>` : email.fromEmail,
      to: email.toEmail,
      subject: email.subject,
      text: email.message, // Plain text body
      html: email.message.replace(/\n/g, '<br>') // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        messageId: info.messageId
      })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to send email'
      })
    };
  }
};
