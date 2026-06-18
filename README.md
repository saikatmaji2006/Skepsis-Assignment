# 📚 StudyBuddy — Backend Development Workshop

> **A guided backend assignment for learning Node.js, Express, MongoDB, and JWT Authentication.**
>
> Build a real-world academic resource sharing platform from the ground up — one function at a time.

---

## 🎯 Project Overview

**StudyBuddy** is a full-stack web application where students can share and discover academic notes. The **frontend is fully built** and ready to use. Your job is to **implement the backend** by completing guided assignments in each file.

Every backend file contains:
- 📋 A clear description of what the file does
- 👤 Which team role owns the file
- 📺 Recommended tutorial videos
- ✅ Step-by-step TODO tasks
- 💡 Hints (without giving away the full solution)
- 📝 API contracts (expected inputs/outputs)
- ☑️ Checklists for self-verification

**The backend will run out of the box**, but every endpoint returns:
```json
{
  "message": "Assignment Pending"
}
```
until you implement the logic.

---

## 🏗️ Backend Architecture

```
backend/
├── config/
│   └── db.js                  ← Database connection (Role 1)
├── models/
│   ├── User.js                ← User data model (Role 1)
│   └── Note.js                ← Note data model (Role 1)
├── controllers/
│   ├── authController.js      ← Auth logic: register, login (Role 2)
│   └── noteController.js      ← CRUD logic: create, read, update, delete (Roles 4 & 5)
├── middleware/
│   ├── authMiddleware.js      ← JWT token verification (Role 3)
│   └── errorHandler.js        ← Global error handling (Role 3)
├── routes/
│   ├── authRoutes.js          ← Auth URL mappings (Role 6)
│   └── noteRoutes.js          ← Note URL mappings (Role 6)
├── server.js                  ← Entry point (Role 6)
├── .env                       ← Environment variables (YOUR secrets)
├── .env.example               ← Template for .env setup
└── package.json               ← Dependencies
```

---

## 👥 Team Roles & File Ownership

### Role 1 — 🗄️ Database Engineer

| File | Description |
|------|-------------|
| `config/db.js` | Connect to MongoDB Atlas using Mongoose |
| `models/User.js` | Define User schema with password hashing |
| `models/Note.js` | Define Note schema with validation & text index |

**Key Skills:** Mongoose, Schema Design, Validation, bcrypt, Pre-save Hooks

**Tutorials:**
- Data Modelling for Backend with Mongoose
- User and Video Model with Hooks and JWT
- How to Connect MongoDB Atlas with Node.js

---

### Role 2 — 🔐 Authentication Engineer

| File | Description |
|------|-------------|
| `controllers/authController.js` | Register, Login, Get Profile |

**Key Skills:** JWT, bcrypt, Express Controllers, Request Validation

**Tutorials:**
- User and Video Model with Hooks and JWT
- Logic Building | Register Controller
- How to use Postman for Backend
- Complete JWT Authentication Tutorial

---

### Role 3 — 🛡️ Security Engineer

| File | Description |
|------|-------------|
| `middleware/authMiddleware.js` | JWT token verification middleware |
| `middleware/errorHandler.js` | Global error handling for all error types |

**Key Skills:** Express Middleware, JWT Verification, Error Types, HTTP Status Codes

**Tutorials:**
- Express Middleware Explained
- Express Error Handling Best Practices
- HTTP Status Codes Explained

---

### Role 4 — 📝 CRUD Engineer A

| Function | File | Description |
|----------|------|-------------|
| `createNote()` | `controllers/noteController.js` | Create a new note |
| `getAllNotes()` | `controllers/noteController.js` | List notes with filters & pagination |
| `getMyNotes()` | `controllers/noteController.js` | Get current user's notes |

**Key Skills:** Mongoose CRUD, Populate, Pagination, Sorting

**Tutorials:**
- MongoDB CRUD Operations with Mongoose
- How to use Postman for Backend

---

### Role 5 — 📝 CRUD Engineer B

| Function | File | Description |
|----------|------|-------------|
| `updateNote()` | `controllers/noteController.js` | Update a note (owner only) |
| `deleteNote()` | `controllers/noteController.js` | Delete a note (owner only) |
| `searchNotes()` | `controllers/noteController.js` | Search notes by keyword |

**Key Skills:** Ownership Checks, Authorization, Regex Search, Mongoose Queries

**Tutorials:**
- MongoDB CRUD Operations with Mongoose
- How to use Postman for Backend

---

### Role 6 — 🔀 Routing Engineer

| File | Description |
|------|-------------|
| `server.js` | Express app setup, middleware & route mounting |
| `routes/authRoutes.js` | Auth route definitions |
| `routes/noteRoutes.js` | Note route definitions |

**Key Skills:** Express Router, Route Mounting, Middleware Chaining, RESTful Design

**Tutorials:**
- How to Setup a Professional Node.js Backend
- Express Routing Complete Guide
- RESTful API Design Best Practices

> **Note:** The Routing Engineer's files are mostly pre-built (routes are structure, not business logic). Focus on **understanding** the routing patterns, then help your teammates debug their implementations.

---

## 📡 API Contracts

### Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and get JWT token |
| GET | `/api/auth/me` | Protected | Get current user profile |

#### POST `/api/auth/register`
```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Success Response (201)
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}

// Error Response (400)
{ "success": false, "message": "A user with that email already exists" }
```

#### POST `/api/auth/login`
```json
// Request Body
{
  "email": "john@example.com",
  "password": "password123"
}

// Success Response (200)
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}

// Error Response (401)
{ "success": false, "message": "Invalid email or password" }
```

#### GET `/api/auth/me`
```
Headers: Authorization: Bearer <token>

// Success Response (200)
{
  "success": true,
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "createdAt": "..." }
}
```

---

### Notes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/notes` | Public | Get all notes (with pagination & filter) |
| GET | `/api/notes/search?q=...` | Public | Search notes |
| GET | `/api/notes/stats` | Public | Get platform statistics |
| POST | `/api/notes` | Protected | Create a new note |
| GET | `/api/notes/my` | Protected | Get current user's notes |
| PUT | `/api/notes/:id` | Protected | Update a note (owner only) |
| DELETE | `/api/notes/:id` | Protected | Delete a note (owner only) |

#### POST `/api/notes`
```json
// Headers: Authorization: Bearer <token>

// Request Body
{
  "title": "DSA Complete Notes",
  "description": "Covers arrays, linked lists, trees, graphs",
  "subject": "DSA",
  "driveLink": "https://drive.google.com/file/d/abc123"
}

// Success Response (201)
{
  "success": true,
  "note": { "_id": "...", "title": "...", "uploadedBy": { "name": "...", "email": "..." }, ... }
}
```

#### GET `/api/notes?subject=DSA&page=1&limit=12`
```json
// Success Response (200)
{
  "success": true,
  "notes": [ ... ],
  "pagination": { "total": 50, "page": 1, "pages": 5 }
}
```

#### PUT `/api/notes/:id`
```json
// Headers: Authorization: Bearer <token>

// Request Body (same as POST)
// Success Response (200)
{ "success": true, "note": { ... } }

// Error (403 — not the owner)
{ "success": false, "message": "Not authorized to update this resource" }
```

#### DELETE `/api/notes/:id`
```json
// Headers: Authorization: Bearer <token>

// Success Response (200)
{ "success": true, "message": "Resource deleted successfully" }

// Error (403 — not the owner)
{ "success": false, "message": "Not authorized to delete this resource" }
```

#### GET `/api/notes/stats`
```json
// Success Response (200)
{
  "success": true,
  "stats": {
    "totalNotes": 50,
    "totalUsers": 10,
    "totalSubjects": 8,
    "weeklyNotes": 5,
    "subjectBreakdown": [ { "_id": "DSA", "count": 12 }, ... ]
  }
}
```

---

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check if server is running |

```json
// Success Response (200)
{ "success": true, "message": "StudyBuddy API is running 🚀", "timestamp": "..." }
```

---

## 🎓 Learning Resources

### Recommended Video Tutorials

| # | Video Title | Relevant For |
|---|-------------|--------------|
| 1 | Data Modelling for Backend with Mongoose | Role 1 (Database) |
| 2 | User and Video Model with Hooks and JWT | Roles 1, 2, 3 |
| 3 | Logic Building \| Register Controller | Roles 2, 4, 5 |
| 4 | How to use Postman for Backend | All Roles |
| 5 | Complete JWT Authentication Tutorial | Roles 2, 3 |
| 6 | Express Middleware Explained | Roles 3, 6 |
| 7 | Express Error Handling Best Practices | Role 3 |
| 8 | MongoDB CRUD Operations with Mongoose | Roles 4, 5 |
| 9 | Express Routing Complete Guide | Role 6 |
| 10 | RESTful API Design Best Practices | Role 6 |

### Key Documentation

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [JWT.io](https://jwt.io/) — Decode and inspect JWT tokens
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs) — Password hashing
- [express-validator](https://express-validator.github.io/) — Request validation
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ installed
- **MongoDB Atlas** account (free tier works)
- **Postman** or similar API testing tool
- A code editor (VS Code recommended)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd studybuddy
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and fill in:
   - `MONGO_URI` — Your MongoDB Atlas connection string (see `.env.example` for step-by-step instructions)
   - `JWT_SECRET` — A random secret string for signing tokens

4. **Start the backend**
   ```bash
   npm run dev
   ```
   You should see: `🚀 StudyBuddy API running on port 5000`

5. **Install and start the frontend** (in a separate terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend runs on `http://localhost:5173`

6. **Test with Postman**
   - Open Postman
   - Try: `GET http://localhost:5000/api/health`
   - You should see: `StudyBuddy API is running 🚀`

---

## ✅ Submission Instructions

### For Each Role

1. **Complete all TODOs** in your assigned files
2. **Test every endpoint** in Postman
3. **Verify the checklist** at the top of each file
4. **Commit your changes** with a descriptive message:
   ```bash
   git add .
   git commit -m "Role 1: Implement database connection and models"
   ```

### Postman Testing Checklist

Use this checklist to verify your implementation:

#### Authentication (Role 2)
- [ ] `POST /api/auth/register` — Creates a new user, returns token
- [ ] `POST /api/auth/register` — Returns error for duplicate email
- [ ] `POST /api/auth/login` — Returns token for valid credentials
- [ ] `POST /api/auth/login` — Returns error for wrong password
- [ ] `GET /api/auth/me` — Returns user profile with valid token
- [ ] `GET /api/auth/me` — Returns 401 without token

#### Notes (Roles 4 & 5)
- [ ] `POST /api/notes` — Creates a note (with token)
- [ ] `POST /api/notes` — Returns 401 without token
- [ ] `GET /api/notes` — Returns all notes with pagination
- [ ] `GET /api/notes?subject=DSA` — Filters by subject
- [ ] `GET /api/notes/my` — Returns only the user's notes
- [ ] `GET /api/notes/search?q=arrays` — Searches notes
- [ ] `PUT /api/notes/:id` — Updates a note (as owner)
- [ ] `PUT /api/notes/:id` — Returns 403 if not owner
- [ ] `DELETE /api/notes/:id` — Deletes a note (as owner)
- [ ] `DELETE /api/notes/:id` — Returns 403 if not owner
- [ ] `GET /api/notes/stats` — Returns platform statistics

#### Middleware (Role 3)
- [ ] Auth middleware blocks requests without tokens
- [ ] Auth middleware blocks requests with invalid tokens
- [ ] Error handler returns proper status codes for all error types

---

## 🔀 GitHub Workflow

### Branch Strategy
Each role should work on their own branch:
```bash
git checkout -b role-1/database-engineer
git checkout -b role-2/auth-engineer
git checkout -b role-3/security-engineer
git checkout -b role-4/crud-engineer-a
git checkout -b role-5/crud-engineer-b
git checkout -b role-6/routing-engineer
```

### Commit Convention
```
Role <N>: <Short description of what you implemented>

Examples:
Role 1: Implement MongoDB connection in db.js
Role 2: Implement register and login controllers
Role 3: Implement JWT verification middleware
Role 4: Implement createNote and getAllNotes
Role 5: Implement updateNote with ownership check
Role 6: Add documentation to route files
```

### Pull Request Flow
1. Push your branch to GitHub
2. Create a Pull Request to `main`
3. Request review from your teammates
4. Once approved, merge to `main`

---

## 🔗 Integration Guide

### Dependency Order
Roles must be completed in a specific order because some files depend on others:

```
Role 1 (Database) ──► Role 2 (Auth) ──► Role 4 (CRUD A)
       │                    │                    │
       │                    ▼                    ▼
       │              Role 3 (Security)    Role 5 (CRUD B)
       │                    │
       ▼                    ▼
  Role 6 (Routing) ← Understanding only
```

1. **Role 1 goes first** — Models and DB connection are needed by everyone
2. **Role 3 can start in parallel** — Middleware is independent but needed for testing
3. **Role 2 comes after Role 1** — Auth controllers use the User model
4. **Roles 4 & 5 come after Roles 1, 2, 3** — CRUD needs models, auth, and middleware
5. **Role 6 studies throughout** — Routes are pre-built; focus on understanding

### Integration Testing
After all roles merge their code:
1. Start the backend: `npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Open `http://localhost:5173` in your browser
4. Register a new account
5. Log in
6. Create a note with a Google Drive link
7. Browse and search notes
8. Edit and delete your own notes
9. Verify you can't edit/delete other users' notes

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | MongoDB ODM (Object Data Modeling) |
| **JWT** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **express-validator** | Request validation |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |
| **nodemon** | Auto-restart during development |

---

## 💡 Tips for Success

1. **Read the assignment header** at the top of each file before coding
2. **Watch the recommended videos** for your role
3. **Test after each TODO** — don't implement everything at once
4. **Use Postman** to test your endpoints
5. **Read the hints** — they're designed to guide without giving the answer
6. **Check the API contracts** — your responses must match the expected format
7. **Ask your Routing Engineer** if you're confused about URL paths
8. **Communicate with your team** — your code depends on theirs!

---

> **Built with ❤️ for backend development education**
>
> *This project is designed as a workshop assignment. The frontend is complete — your mission is to bring the backend to life!*
data base dev has checked in right
