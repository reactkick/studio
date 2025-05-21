
![1000004806](https://github.com/user-attachments/assets/651f6d57-fcff-4326-806d-f0243a9ab057)

# ReactKick - Real-time Collaborative IDE

A powerful Node.js-based IDE featuring real-time collaboration, code execution, and OAuth authentication built on Replit.

## 🚀 Features

- **Real-time Collaboration**
  - Live code sharing using WebSocket
  - Multi-user editing support
  - Real-time chat functionality

- **Authentication**
  - Google OAuth integration
  - GitHub OAuth integration
  - Secure session management

- **Development Environment**
  - Interactive code sandbox
  - Multiple language support
  - Real-time code execution
  - AI-powered debugging assistance

- **Security**
  - Helmet.js protection
  - Rate limiting
  - CORS configuration
  - Request payload limits
  - Strong ETags

- **Performance**
  - Response compression
  - Caching support
  - Auto-scaling configuration
  - Performance monitoring

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: React + Vite
- **Real-time**: Socket.IO
- **Authentication**: Passport.js
- **Monitoring**: Prometheus client

## 🏃‍♂️ Getting Started

1. Fork this Repl in Replit
2. Set up the following environment variables in Replit Secrets:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `ADMIN_EMAIL`

## 🎮 Running the Application

The application comes with two main workflows:

1. **Production Mode**
   - Click the "Run" button
   - Server starts on port 5000

2. **Development Mode**
   - Use the "Dev" workflow
   - Runs server (port 5000) and client (port 3000)

## 🔍 API Endpoints

- `/auth/google` - Google OAuth
- `/auth/github` - GitHub OAuth
- `/api/items` - CRUD operations
- `/metrics` - Performance monitoring

## 🛡️ Security Features

- Helmet.js security headers
- Rate limiting protection
- Payload size restrictions
- Strong ETags enabled
- Compression enabled
- CORS protection

## 📊 Monitoring

Access metrics at `/metrics` endpoint for:
- Request duration
- Error rates
- System metrics
- Resource usage

## 🤝 Contributing

Feel free to submit issues and enhancement requests through Replit!

## 📜 License

ISC License
