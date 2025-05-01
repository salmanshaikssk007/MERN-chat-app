# 💬 MERN Chat App

A scalable, real-time **chat application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and **Socket.IO**. This app supports user authentication, one-to-one and group chats, typing indicators, and real-time messaging with online status.

---

## 🚀 Features

- 🔐 JWT Authentication (Login & Signup)
- 👤 One-to-One and 👥 Group Chat
- 💬 Real-time Messaging via **Socket.IO**
- ✍️ Typing Indicators & Message Seen Status
- 🟢 Online/Offline User Presence
- 🔍 User Search & Chat Creation
- 🎨 Responsive Design (Tailwind/Chakra UI)

---

## 🛠️ Tech Stack

### **Frontend**
- React.js (with Context API or Redux)
- Axios for API calls
- Tailwind CSS / Chakra UI

### **Backend**
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- Socket.IO (WebSocket Integration)
- JWT & bcrypt.js for Auth
- CORS, Helmet (Security)

### **Infrastructure**
- **Docker** & **Docker Compose**
- **Kubernetes (K8s)** with **Helm Charts**
- MongoDB Atlas or self-hosted
- Hosted on **AWS (EKS, S3 , VPC)**
- CI/CD via **GitHub Actions**
- Auto-scaling via **Horizontal Pod Autoscaler (HPA)**

---

## 📁 Project Structure

```bash
mern-chat-app/
├── backend/              # Node.js + Express + MongoDB
├── frontend/             # React app
├── terraform/            # AWS infrastructure (EKS, VPC, RDS, etc.)
└── k8/helm/              # Helm charts for K8s deployments
    ├── backend/
    ├── frontend/
    ├── mongodb/
    └── ingress/
```

---

## 🔌 API Endpoints

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| POST   | `/api/user`        | Register/Login             |
| GET    | `/api/user?search=`| Search Users               |
| POST   | `/api/chat`        | Create One-to-One Chat     |
| GET    | `/api/chat`        | Get All Chats              |
| POST   | `/api/group`       | Create Group Chat          |
| PUT    | `/api/group/rename`| Rename Group               |
| PUT    | `/api/group/add`   | Add User to Group          |
| PUT    | `/api/group/remove`| Remove User from Group     |
| POST   | `/api/message`     | Send Message               |
| GET    | `/api/message/:id` | Fetch Messages by Chat ID  |

> ⚡ Messages sync in real-time using **Socket.IO**

---

## 🧪 Getting Started (Local)

### Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm run server
```

**`.env` (backend):**
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

**`.env` (frontend):**
```env
REACT_APP_API_URL=http://localhost:3000
```

---

## ☸️ Kubernetes (Optional)

> Used in cloud environments for production-scale deployments

- All deployments are Helm-based
- Secrets like `MONGO_URI` injected via Kubernetes Secrets
- HPA handles pod auto-scaling based on CPU usage
- Configured Ingress for routing frontend and backend traffic

---

## 🔁 CI/CD with GitHub Actions

- Auto-deploys on `main` branch push
- Uses Docker to build and push images
- Applies updated manifests to EKS using `kubectl`
- Supports rollback with Helm

---

## 📦 Docker (Local)

```bash
docker-compose up --build
```

---

## 📤 Deployment

- **Frontend & Backend** containerized and deployed to **EKS**
- MongoDB hosted on **MongoDB Atlas** or on a **K8s pod**
- Static files served via **Nginx** or directly in React app

---

## 🧑‍💻 Author

**Salman Shaik**  
📧 [salmanshaikssk007@gmail.com](mailto:salmanshaikssk007@gmail.com)  

---

## 🪪 License

This project is licensed under the [MIT License](./LICENSE).
