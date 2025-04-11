# 💬 MERN Chat App

A full-stack **real-time chat application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with **Socket.io** for instant messaging. This app supports user authentication, individual and group chats, typing indicators, and real-time message delivery.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Login/Sign Up)
- 👥 One-to-One and Group Chat Support
- 💬 Real-time Messaging via Socket.IO
- ✍️ Typing Indicators
- 🟢 Online/Offline Status
- 🧭 User Search and Chat Initiation
- 🎨 Responsive UI

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Axios
- Context API / Redux (optional)
- Tailwind CSS or Chakra UI

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.IO (WebSocket Integration)
- JWT (for auth)
- bcrypt.js (password hashing)
- CORS + Helmet for security

---

## 📁 Project Structure
```bash
MERN-chat-app/
├── backend/
│   ├── config/         # DB & env config
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth & error handlers
│   └── server.js       # Entry point + socket setup
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ # Chat UI components
│   │   ├── context/    # State management
│   │   ├── pages/      # App screens
│   │   └── App.js
│   └── package.json
```
---

## 🔌 API Endpoints

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | /api/user         | Register/Login             |
| GET    | /api/user?search= | Search Users               |
| POST   | /api/chat         | Create One-to-One Chat     |
| GET    | /api/chat         | Fetch All Chats            |
| POST   | /api/group        | Create Group Chat          |
| PUT    | /api/group/rename | Rename Group               |
| PUT    | /api/group/add    | Add User to Group          |
| PUT    | /api/group/remove | Remove User from Group     |
| POST   | /api/message      | Send Message               |
| GET    | /api/message/:id  | Fetch Messages by Chat ID  |

> ⚡ All messages are synced real-time using Socket.IO.

---

## 🧪 Getting Started

### Prerequisites

- Node.js >= 16.x
- MongoDB (Local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
# Set up .env with MONGO_URI and JWT_SECRET
npm run server
```
### env (backend)
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:3000
```
### Frontend setup
```bash
cd frontend
npm install
npm start
```
### env (Frontend)
```bash
REACT_APP_API_URL=http://localhost:5000
```
### 🧑‍💻 Author
- Salman Shaik
📧 salmanshaikssk007@gmail.com
🔗 LinkedIn
🐙 GitHub
### 🪪 License
-  This project is licensed under the MIT License.
  
