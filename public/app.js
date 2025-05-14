document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendButton');
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    
    sendButton.addEventListener('click', async function() {
        // Gather form data
        const smtpData = {
            host: document.getElementById('smtpHost').value,
            port: document.getElementById('smtpPort').value,
            user: document.getElementById('smtpUser').value,
            pass: document.getElementById('smtpPass').value
        };
        
        const emailData = {
            fromName: document.getElementById('fromName').value,
            fromEmail: document.getElementById('fromEmail').value,
            toEmail: document.getElementById('toEmail').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate inputs
        const requiredFields = [
            { value: smtpData.host, name: 'SMTP Host' },
            { value: smtpData.port, name: 'SMTP Port' },
            { value: smtpData.user, name: 'SMTP Username' },
            { value: smtpData.pass, name: 'SMTP Password' },
            { value: emailData.fromEmail, name: 'From Email' },
            { value: emailData.toEmail, name: 'To Email' },
            { value: emailData.subject, name: 'Subject' }
        ];
        
        const missingFields = requiredFields.filter(field => !field.value);
        
        if (missingFields.length > 0) {
            showResult(`Please fill in the following required fields: ${missingFields.map(f => f.name).join(', ')}`, 'error');
            return;
        }
        
        // Show loading state
        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';
        
        try {
            // Call the Netlify function
            const response = await fetch('/.netlify/functions/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    smtp: smtpData,
                    email: emailData
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showResult(`Email sent successfully!\n\nMessage ID: ${data.messageId}`, 'success');
            } else {
                showResult(`Error: ${data.error}`, 'error');
            }
        } catch (error) {
            showResult(`Network error: ${error.message}`, 'error');
        } finally {
            // Reset button state
            sendButton.disabled = false;
            sendButton.textContent = 'Send Test Email';
        }
    });
    
    function showResult(message, type) {
        resultContent.textContent = message;
        resultDiv.className = `result-box ${type}`;
        resultDiv.classList.remove('hidden');
        
        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
});
