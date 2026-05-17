# AutoBiz - Business Automation SaaS

AutoBiz is an enterprise-grade, production-ready SaaS application for business workflow automation, real-time analytics, and team management.

## 🚀 Features

- **Full Auth System**: JWT with Refresh Token rotation, RBAC (Admin, Manager, Employee, Customer).
- **Dashboard**: Real-time KPI tracking, interactive charts (Recharts), and activity logs.
- **Task Management**: CRUD operations for tasks with priority, status tracking, and assignment.
- **Real-time Notifications**: Instant alerts via Socket.io and toast notifications.
- **Modern UI**: Clean, responsive design inspired by Stripe and Linear using Tailwind CSS and Framer Motion.
- **Scalable Architecture**: Modular backend (Express/TS) and feature-based frontend (React/TS/Zustand).
- **Dockerized**: Easy deployment with Docker and Docker Compose.

## 🛠 Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion, Zustand, React Query, Recharts.
- **Backend**: Node.js, Express, TypeScript, Mongoose, Socket.io, JWT.
- **Database**: MongoDB.
- **Testing**: Jest, Supertest.
- **DevOps**: Docker, Nginx.

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Docker (Optional)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd autobiz
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env # Update with your DB URI and Secrets
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

### Running with Docker

```bash
docker-compose up --build
```

## 📂 Project Structure

```text
├── backend/            # Express API
│   ├── src/
│   │   ├── controllers/# Request handlers
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── services/   # Business logic
├── frontend/           # React App
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── store/      # Zustand state
│   │   └── pages/      # View components
└── docker-compose.yml  # Orchestration
```

## 📝 License

MIT
