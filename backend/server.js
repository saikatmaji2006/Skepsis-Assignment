/*
==================================================

  ROLE OWNER:
  Routing Engineer

  FILE:
  server.js

  PURPOSE:
  This is the ENTRY POINT of the entire backend.
  When you run "npm start" or "npm run dev", this file
  is executed first. It sets up Express, loads middleware,
  mounts API routes, connects to the database, and starts
  listening for incoming HTTP requests.

  Think of this file as the "main()" of the backend.

  LEARNING TOPICS:
  - Express App Setup
  - Middleware Registration Order
  - Environment Variables with dotenv
  - Route Mounting with app.use()
  - CORS (Cross-Origin Resource Sharing)
  - Health Check Endpoints
  - 404 Handling
  - Server Startup with async/await

  RECOMMENDED VIDEOS:
  Video: How to Setup a Professional Node.js Backend
  Video: Express Middleware Explained
  Video: How to use Postman for Backend

  YOUR TASKS:
  [ ] Understand the middleware registration order
  [ ] Understand route mounting with app.use()
  [ ] Understand the health check endpoint
  [ ] Understand the 404 handler
  [ ] Understand the server startup flow

  ESTIMATED TIME:
  1 Hour (Study & Understand)

  ARCHITECTURE OVERVIEW:
  ┌──────────────────────────────────────────────────────┐
  │                    server.js                         │
  │                                                      │
  │  1. Load environment variables (.env)                │
  │  2. Import route modules                             │
  │  3. Create Express app                               │
  │  4. Register middleware (CORS, JSON parser)           │
  │  5. Mount API routes                                 │
  │  6. Health check endpoint                            │
  │  7. 404 handler                                      │
  │  8. Global error handler                             │
  │  9. Connect to MongoDB                               │
  │ 10. Start HTTP server                                │
  └──────────────────────────────────────────────────────┘

  QUESTIONS FOR UNDERSTANDING:
  ──────────────────────────────────────────────

  Q: Why do we call dotenv.config() at the top?
  A: It loads variables from the .env file into process.env.
     Without this, process.env.MONGO_URI and JWT_SECRET would be undefined.

  Q: Why do we use app.use(cors())?
  A: CORS allows the frontend (running on localhost:5173)
     to make requests to the backend (running on localhost:5000).
     Without it, browsers block cross-origin requests.

  Q: Why do we use app.use(express.json())?
  A: It parses incoming JSON request bodies and makes them
     available as req.body. Without it, req.body would be undefined.

  Q: Why is app.use("/api/auth", authRoutes) used?
  A: This MOUNTS all authentication routes under the /api/auth prefix.
     So router.post('/register') becomes POST /api/auth/register.

  Q: Why is the error handler registered LAST?
  A: Express error handlers must be registered AFTER all routes.
     They catch errors from any route/middleware above them.

  Q: Why is startServer() an async function?
  A: Because connectDB() is async (it awaits the MongoDB connection).
     We need to wait for the DB connection before starting the server.

  CHECKLIST:
  [ ] Understand why middleware order matters
  [ ] Understand route mounting with app.use()
  [ ] Can explain the full startup flow
  [ ] Can explain what each middleware does
  [ ] Server starts without errors

==================================================
*/

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Route imports
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// ──────────────────────────────────────────────
// Middleware (runs on EVERY request)
// ──────────────────────────────────────────────
app.use(cors());                              // Enable CORS for frontend
app.use(express.json());                      // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ──────────────────────────────────────────────
// API Routes (mounted under /api prefix)
// ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);   // All auth routes: /api/auth/register, /api/auth/login, /api/auth/me
app.use('/api/notes', noteRoutes);  // All note routes: /api/notes, /api/notes/my, /api/notes/:id, etc.

// ──────────────────────────────────────────────
// Health Check — useful for testing if server is running
// ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'StudyBuddy API is running 🚀',
    timestamp: new Date().toISOString(),
  });
});

// ──────────────────────────────────────────────
// 404 Handler — catches requests to undefined routes
// ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ──────────────────────────────────────────────
// Global Error Handler — MUST be registered LAST
// ──────────────────────────────────────────────
app.use(errorHandler);

// ──────────────────────────────────────────────
// Start Server
// ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 StudyBuddy API running on port ${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  });
};

startServer();
