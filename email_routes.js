// routes/email.js - Email handling routes
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Route to handle test email sending
router.post('/send-test-email', async (req, res) => {
    try {
        const {
            smtpHost,
            smtpPort,
            smtpUsername,
            smtpPassword,
            fromEmail,
            toEmail,
            subject,
            message
        } = req.body;

        // Validate required fields
        if (!smtpHost || !smtpPort || !smtpUsername || !smtpPassword || 
            !fromEmail || !toEmail || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a transporter with the provided SMTP settings
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort),
            secure: smtpPort === '465', // true for port 465, false for other ports
            auth: {
                user: smtpUsername,
                pass: smtpPassword
            }
        });

        // Create email options
        const mailOptions = {
            from: fromEmail,
            to: toEmail,
            subject: subject,
            text: message,
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</div>`
        };

        // Add debug log
        console.log(`Attempting to send email from ${fromEmail} to ${toEmail} using SMTP ${smtpHost}:${smtpPort}`);

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent successfully:', info.messageId);
        
        // Return success response
        res.status(200).json({
            success: true,
            message: 'Test email sent successfully!',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Format a user-friendly error message
        let errorMessage = 'Failed to send email';
        if (error.code === 'EAUTH') {
            errorMessage = 'Authentication failed. Please check your SMTP username and password.';
        } else if (error.code === 'ESOCKET') {
            errorMessage = 'Connection error. Please check your SMTP host and port settings.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        res.status(500).json({ 
            success: false,
            error: errorMessage 
        });
    }
});

module.exports = router;