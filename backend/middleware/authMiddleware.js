/*
==================================================

  ROLE OWNER:
  Security Engineer

  FILE:
  middleware/authMiddleware.js

  PURPOSE:
  Protects private routes by verifying JWT tokens.
  When a user logs in, they receive a token. On every
  subsequent request to a protected route, this middleware
  checks that the token is valid and attaches the user
  to the request object (req.user).

  Without this middleware, anyone could access private
  endpoints like creating/editing/deleting notes.

  LEARNING TOPICS:
  - Express Middleware (req, res, next pattern)
  - JWT Verification (jwt.verify)
  - Authorization Headers (Bearer Token pattern)
  - Token Extraction from Headers
  - Attaching Data to Request Object

  RECOMMENDED VIDEOS:
  Video: User and Video Model with Hooks and JWT
  Video: Complete JWT Authentication Tutorial
  Video: Express Middleware Explained

  YOUR TASKS:
  [x] Read the Authorization header from the request
  [x] Extract the JWT token (split "Bearer <token>")
  [x] Verify the token using jwt.verify()
  [x] Find the user by decoded ID and attach to req.user
  [x] Handle missing/invalid tokens with proper errors

  ESTIMATED TIME:
  2-3 Hours

  API CONTRACT:
  This middleware is used on protected routes like:
    POST /api/notes
    GET  /api/notes/my
    PUT  /api/notes/:id
    DELETE /api/notes/:id
    GET  /api/auth/me

  Expected Header:
    Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

  On success: req.user is set and next() is called
  On failure: 401 response with error message

  CHECKLIST:
  [x] Reads Authorization header correctly
  [x] Extracts token after "Bearer "
  [x] Verifies token with jwt.verify()
  [x] Finds user by decoded ID
  [x] Attaches user to req.user
  [x] Returns 401 if no token provided
  [x] Returns 401 if token is invalid
  [x] Returns 401 if user not found

==================================================
*/

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  /*
  ──────────────────────────────────────────────
  STEP 1: Read the Authorization header
  ──────────────────────────────────────────────

  Check if the request has an Authorization header
  AND if it starts with "Bearer".

  Hint:
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Token exists — proceed to Step 2
  }
  ──────────────────────────────────────────────
  */

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      /*
      ──────────────────────────────────────────────
      STEP 2: Extract the token
      ──────────────────────────────────────────────

      The Authorization header looks like:
        "Bearer eyJhbGciOiJIUzI1NiIs..."

      Split by space and take the second part.

      Hint:
      token = req.headers.authorization.split(' ')[1];
      ──────────────────────────────────────────────
      */

      token = req.headers.authorization.split(' ')[1];

      /*
      ──────────────────────────────────────────────
      STEP 3: Verify the token
      ──────────────────────────────────────────────

      Use jwt.verify() to decode and verify the token.
      If the token is tampered with or expired, this
      will throw an error (caught by the catch block).

      Hint:
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      ──────────────────────────────────────────────
      */

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      /*
      ──────────────────────────────────────────────
      STEP 4: Attach user to request
      ──────────────────────────────────────────────

      Use the decoded token's ID to find the user
      in the database and attach them to req.user.

      Hint:
      req.user = await User.findById(decoded.id);

      Then check if the user still exists:
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }
      ──────────────────────────────────────────────
      */

      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }

      /*
      ──────────────────────────────────────────────
      STEP 5: Call next() to proceed
      ──────────────────────────────────────────────

      If everything is valid, call next() to pass
      control to the next middleware or route handler.

      Hint:
      next();
      ──────────────────────────────────────────────
      */

      next();

    } catch (error) {
      console.error('Auth middleware error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};

module.exports = { protect };
