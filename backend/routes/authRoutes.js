/*
==================================================

  ROLE OWNER:
  Routing Engineer

  FILE:
  routes/authRoutes.js

  PURPOSE:
  Defines the URL routes for authentication.
  This file maps HTTP methods + URL paths to the
  correct controller functions and middleware.

  Think of routes as the "table of contents" for your API.
  They tell Express: "When someone visits THIS URL with
  THIS method, run THIS function."

  LEARNING TOPICS:
  - Express Router
  - Route Definitions (GET, POST, PUT, DELETE)
  - Middleware Chaining (validation → controller)
  - Protected vs Public Routes
  - RESTful API Design

  RECOMMENDED VIDEOS:
  Video: How to use Postman for Backend
  Video: Express Routing Complete Guide
  Video: RESTful API Design Best Practices

  YOUR TASKS:
  [ ] Understand the existing route definitions
  [ ] Know which routes are public vs protected
  [ ] Understand middleware chaining order

  ESTIMATED TIME:
  1 Hour (Study & Understand)

  ROUTE MAP:
  ┌─────────┬────────────────────┬────────────┬─────────────────────────┐
  │ Method  │ Path               │ Access     │ Controller              │
  ├─────────┼────────────────────┼────────────┼─────────────────────────┤
  │ POST    │ /api/auth/register │ Public     │ register()              │
  │ POST    │ /api/auth/login    │ Public     │ login()                 │
  │ GET     │ /api/auth/me       │ Protected  │ getMe()                 │
  └─────────┴────────────────────┴────────────┴─────────────────────────┘

  QUESTIONS FOR UNDERSTANDING:
  ──────────────────────────────────────────────

  Q: Why does /register use registerValidation middleware?
  A: The validation middleware runs BEFORE the controller.
     It checks that name, email, and password are valid.
     If validation fails, the controller never runs.

  Q: Why does /me use the 'protect' middleware?
  A: The protect middleware checks for a valid JWT token.
     Only logged-in users should access their own profile.
     Without protect, anyone could call GET /api/auth/me.

  Q: What does the order of middleware matter?
  A: Middleware runs left-to-right:
     router.post('/register', registerValidation, register)
     1. registerValidation runs first → validates input
     2. register runs second → creates the user
     If validation fails, register() is never called.

  CHECKLIST:
  [ ] Understand what express.Router() does
  [ ] Understand the difference between public and protected routes
  [ ] Understand middleware chaining order
  [ ] Can explain why 'protect' is used on /me but not /register

==================================================
*/

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  register,
  login,
  getMe,
  registerValidation,
  loginValidation,
} = require('../controllers/authController');

// ──────────────────────────────────────────────
// Public Routes (no authentication needed)
// ──────────────────────────────────────────────

// POST /api/auth/register — Create a new user account
// Middleware chain: registerValidation → register
router.post('/register', registerValidation, register);

// POST /api/auth/login — Log in and receive a JWT token
// Middleware chain: loginValidation → login
router.post('/login', loginValidation, login);

// ──────────────────────────────────────────────
// Protected Routes (JWT token required)
// ──────────────────────────────────────────────

// GET /api/auth/me — Get the currently logged-in user's profile
// Middleware chain: protect → getMe
router.get('/me', protect, getMe);

module.exports = router;
