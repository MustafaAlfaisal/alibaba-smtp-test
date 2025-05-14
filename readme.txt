# Alibaba Direct Mail SMTP Test Tool

A simple web application that allows your team to test the Alibaba Direct Mail SMTP service with a user-friendly interface.

## Features

- Web-based SMTP testing interface
- Configurable SMTP settings
- Real-time email sending and feedback
- Detailed error reporting
- Simple deployment options

## Project Structure

```
alibaba-smtp-test/
├── public/
│   └── index.html         # Frontend interface
├── routes/
│   └── email.js           # Email handling routes
├── server.js              # Main server file
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Alibaba Direct Mail SMTP credentials

### Installation

1. Clone this repository or download the files
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the server:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Using the Application

1. Open http://localhost:3000 in your web browser
2. Fill in the SMTP settings:
   - SMTP Host: Usually `smtpdm.aliyun.com`
   - SMTP Port: `80` (or `25` for unencrypted, `465` for SSL)
   - SMTP Username: Your Alibaba Direct Mail username
   - SMTP Password: Your Alibaba Direct Mail password
3. Enter email details:
   - From Email: Sender's email address
   - To Email: Recipient's email address
   - Subject: Email subject
   - Message: Email content
4. Click "Send Test Email" to perform the test
5. View the results in the results section

## Deployment Options

### Deploy to Heroku

1. Create a Heroku account if you don't have one
2. Install the Heroku CLI
3. Log in to Heroku:

```bash
heroku login
```

4. Create a new Heroku app:

```bash
heroku create your-app-name
```

5. Deploy the application:

```bash
git push heroku main
```

### Deploy to Digital Ocean / AWS / GCP

1. Set up a Node.js environment on your preferred cloud provider
2. Upload the project files
3. Install dependencies: `npm install`
4. Start the application: `npm start`
5. Configure your web server (Nginx, Apache) to proxy requests to the Node.js application

### Docker Deployment

1. Create a Dockerfile in the project root:

```Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

2. Build the Docker image:

```bash
docker build -t alibaba-smtp-test .
```

3. Run the Docker container:

```bash
docker run -p 3000:3000 alibaba-smtp-test
```

## Security Considerations

- This application handles sensitive SMTP credentials
- When deploying to production, ensure:
  - The application is served over HTTPS
  - Access is restricted to authorized team members
  - Consider implementing authentication
  - Do not store credentials in the code or repository

## Troubleshooting

### Common SMTP Issues

- **Authentication failed**: Check your SMTP username and password
- **Connection timeout**: Verify the SMTP host and port settings
- **Connection refused**: Ensure your network allows outgoing connections on the specified port
- **Invalid sender**: Verify that the "From" email address is authorized in your Alibaba Direct Mail settings

### Application Issues

- **Server won't start**: Check for errors in the console output
- **Form submission fails**: Check your browser's network console for API errors
- **Nodemailer errors**: Consult the Nodemailer documentation or Alibaba Direct Mail documentation

## License

This project is licensed under the MIT License.