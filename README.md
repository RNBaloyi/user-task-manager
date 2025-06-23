# 🧑‍💻 Full Stack User Task Manager – Technical Assessment

This is a full-stack task management application built as part of a **Full Stack Developer Technical Challenge**.

It allows for:
- Creating and listing users
- Adding and viewing tasks for each user

---

## 📋 Challenge Requirements

### ✅ Implemented Features

**Backend (Node.js + Express + TypeScript + SQLite):**
- `GET /users` – List all users
- `POST /users` – Create a new user
- `GET /users/:id/tasks` – List all tasks for a specific user
- `POST /users/:id/tasks` – Create a new task for a user
- SQLite database for persistent storage
- TypeScript used throughout
- Routing and business logic separated into modular files

**Frontend (React + Vite):**
- Form to create new users
- List of users
- On user click: display their tasks and a form to add a new task
- Basic styling with a clean UI

**Extras:**
- ✅ Deployed on Render (frontend + backend)
- ✅ Basic input validation (no empty names or tasks)
- ✅ Modular code structure
- ✅ Axios-based API communication
- ✅ Basic integration tests using `supertest` and `jest` (for backend)
- ✅ GitHub Actions CI workflow configured to run backend tests on push/pull request
- ✅ Pagination and filtering for users and tasks
- ✅ Unit tests


---

## 🌍 Live Demo

- **Frontend**: [https://user-task-manager-frontend2.onrender.com](https://user-task-manager-frontend2.onrender.com)  
- **Backend**: [https://user-task-manager-backend-app2.onrender.com](https://user-task-manager-backend-app2.onrender.com)

---

## 🚀 Getting Started Locally

### 🔧 Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript project:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm start
   ```

> Server runs at: `http://localhost:3000`

---

### 💻 Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

> App runs at: `http://localhost:5173`

Make sure the Axios base URL in `frontend/src/api.ts` is pointing to your local or deployed backend.

---

## 🧪 Testing

The backend includes integration tests using `supertest` and `jest`.

To run the tests:
```bash
cd backend
npm run test
```

> The test file is located at `backend/tests/test.ts`.

---

## ⚙️ GitHub Actions CI

A GitHub Actions workflow (`.github/workflows/test.yml`) is included.  
It automatically installs dependencies and runs backend tests on every push and pull request.

---

## 📦 Folder Structure

```
user-task-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── tests/
│   └── database.sqlite
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── api.ts
```

