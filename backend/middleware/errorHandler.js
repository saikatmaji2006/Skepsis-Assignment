/*
==================================================

  ROLE OWNER:
  Security Engineer

  FILE:
  middleware/errorHandler.js

  PURPOSE:
  Global error handling middleware for Express.
  This catches ALL errors that bubble up from controllers
  and routes, and sends clean, consistent error responses
  to the client instead of ugly stack traces.

  Without this, unhandled errors would crash the server
  or expose internal details to users.

  LEARNING TOPICS:
  - Express Error-Handling Middleware (4 parameters: err, req, res, next)
  - Mongoose Error Types (ValidationError, CastError, duplicate key)
  - JWT Error Types (JsonWebTokenError, TokenExpiredError)
  - HTTP Status Codes for Errors (400, 401, 404, 500)
  - Defensive Programming

  RECOMMENDED VIDEOS:
  Video: Express Error Handling Best Practices
  Video: Building Robust Node.js APIs
  Video: HTTP Status Codes Explained

  YOUR TASKS:
  [ ] Handle Mongoose ValidationError (400)
  [ ] Handle Mongoose duplicate key error / code 11000 (400)
  [ ] Handle Mongoose CastError / bad ObjectId (404)
  [ ] Handle JWT JsonWebTokenError (401)
  [ ] Handle JWT TokenExpiredError (401)
  [ ] Add a default 500 fallback for unknown errors

  ESTIMATED TIME:
  2-3 Hours

  API CONTRACT:
  This middleware is registered LAST in server.js:
    app.use(errorHandler);

  It receives errors via next(error) from controllers.

  All error responses follow this format:
  {
    "success": false,
    "message": "<human-readable error message>"
  }

  CHECKLIST:
  [ ] Middleware has 4 parameters (err, req, res, next)
  [ ] ValidationError returns 400 with field-specific messages
  [ ] Duplicate key (code 11000) returns 400
  [ ] CastError returns 404 with "Resource not found"
  [ ] JsonWebTokenError returns 401
  [ ] TokenExpiredError returns 401
  [ ] Unknown errors return 500
  [ ] Error is logged to console for debugging

==================================================
*/

const errorHandler = (err, req, res, next) => {
  /*
  ──────────────────────────────────────────────
  STEP 1: Log the error (for debugging)
  ──────────────────────────────────────────────

  Always log errors to the server console so developers
  can see what went wrong.

  Hint:
  console.error('Error:', err.message);
  ──────────────────────────────────────────────
  */


  /*
  ──────────────────────────────────────────────
  STEP 2: Handle Mongoose ValidationError
  ──────────────────────────────────────────────

  When Mongoose validation fails (e.g., missing required
  field, value too long), err.name === 'ValidationError'.

  Extract the error messages and return them.

  Hint:
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }
  ──────────────────────────────────────────────
  */


  /*
  ──────────────────────────────────────────────
  STEP 3: Handle Mongoose duplicate key error
  ──────────────────────────────────────────────

  When a unique field (like email) already exists,
  MongoDB returns error code 11000.

  Hint:
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `A user with that ${field} already exists`,
    });
  }
  ──────────────────────────────────────────────
  */


  /*
  ──────────────────────────────────────────────
  STEP 4: Handle Mongoose CastError (bad ObjectId)
  ──────────────────────────────────────────────

  When an invalid ID format is passed (e.g., "abc" instead
  of a valid MongoDB ObjectId), err.name === 'CastError'.

  Hint:
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  }
  ──────────────────────────────────────────────
  */


  /*
  ──────────────────────────────────────────────
  STEP 5: Handle JWT errors
  ──────────────────────────────────────────────

  Handle two JWT error types:

  A) JsonWebTokenError — token is malformed or tampered
  B) TokenExpiredError — token has expired

  Both should return 401 (Unauthorized).

  Hint:
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }
  ──────────────────────────────────────────────
  */


  /*
  ──────────────────────────────────────────────
  STEP 6: Default error response
  ──────────────────────────────────────────────

  If none of the above match, send a generic 500 error.

  Hint:
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
  ──────────────────────────────────────────────
  */

  // ⬇️ Remove this once you implement the STEPs above
  // Default fallback so the server doesn't crash
  res.status(500).json({
    success: false,
    message: "Error handler not yet implemented (Assignment Pending)",
  });
};

module.exports = errorHandler;
