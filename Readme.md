# 📝 Blog Platform – MERN Stack (Node.js, TypeScript, React, Redux Saga)

A full-featured **Blog Platform** built using **Node.js, Express, MongoDB, React, Redux Toolkit, and Redux Saga** with **role-based authentication**, **OAuth login**, **Admin Panel**, **Swagger API docs**, and **testing**.

## Features

### Authentication & Authorization
- User Registration & Login (JWT-based)
- Role-based access (`USER`, `ADMIN`)
- Google OAuth Login
- Facebook OAuth Login
- Protected routes for users and admins
- Optional authentication for public APIs

### Post Management
- Create, Read, Update, Delete (CRUD) posts
- Pagination & search support
- Role-based access:
  - Users see only their own posts
  - Admins see all posts
- Soft delete support (`isDeleted`)

### Comment Management
- Add comments to posts
- Edit/Delete own comments
- Admin can manage all comments
- Post–Comment relationship using MongoDB references

### Admin Panel
- Dashboard with statistics:
  - Total Users
  - Total Posts
  - Total Comments
- Manage users & roles
- Manage posts and comments
- Chart-based analytics

### iddleware
- Authentication middleware
- Role-based route guards
- Activity logging middleware (file-based logging)
- Optional authentication middleware (public + protected APIs)

### API Documentation
- Full **Swagger (OpenAPI 3.0)** documentation
- JWT-secured endpoints
- OAuth endpoints documented
- Accessible via `/api-docs`

### Testing
- Backend testing with **Jest + Supertest**
- Frontend testing with **React Testing Library**
- Covers:
  - Auth APIs
  - Posts APIs
  - Comments APIs
  - Admin APIs
  - Frontend User & Admin UI

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Passport.js (Google & Facebook OAuth)
- JWT Authentication
- Swagger (swagger-jsdoc, swagger-ui-express)
- Jest & Supertest

### Frontend
- React (Vite)
- TypeScript
- Redux Toolkit
- Redux Saga
- React Router
- Material UI (MUI)
- React Testing Library

## 📦 Installation Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/TapasSahoo78/mern-project-2026.git
cd blog-platform

2️⃣ Backend Setup
cd backend
npm install

Run Backend
npm run dev

Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install

Run Frontend
npm run dev


Frontend runs on:

http://localhost:5173

⚙️ Environment Setup
📄 Backend .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blog_db
JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

Frontend .env
VITE_API_URL=http://localhost:5000/api/v1

🔑 OAuth Setup
Google OAuth

Create OAuth Client ID in Google Developer Console

Add:

Authorized redirect URI:

http://localhost:5000/api/v1/auth/google/callback

Facebook OAuth

Create Facebook App (Consumer type)

Enable Facebook Login

Add:

http://localhost:5000/api/v1/auth/facebook/callback

📘 API Documentation (Swagger)

Swagger UI is available at:

http://localhost:5000/api-docs

Includes:

Auth APIs

OAuth APIs

Posts APIs

Comments APIs

Admin APIs

JWT Authorization support

🧪 Running Tests
Backend Tests
cd backend
npm test

Frontend Tests
cd frontend
npm test

📂 Project Structure (Simplified)
backend/
 ├─ src/
 │  ├─ controllers/
 │  ├─ routes/
 │  ├─ middleware/
 │  ├─ models/
 │  ├─ services/
 │  ├─ config/
 │  └─ app.ts
 └─ tests/

frontend/
 ├─ src/
 │  ├─ pages/
 │  ├─ components/
 │  ├─ features/
 │  ├─ routes/
 │  ├─ hooks/
 │  └─ app/
 └─ tests/

🔐 Role-Based Access Summary
Role	Access
Guest	View posts & comments
User	Create posts, comment, manage own content
Admin	Full access (users, posts, comments)
📌 Notes

JWT logout is handled client-side

OAuth users are stored without passwords

Email from OAuth providers is optional

Activity logs are stored in /logs/activity.log


👨‍💻 Author

Tapas Sahoo
Web Developer | MERN Stack | TypeScript | Node.js

📄 License

This project is licensed for educational and assignment purposes.


