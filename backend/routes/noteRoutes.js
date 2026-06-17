/*
==================================================

  ROLE OWNER:
  Routing Engineer

  FILE:
  routes/noteRoutes.js

  PURPOSE:
  Defines the URL routes for note operations (CRUD).
  Maps HTTP methods + URL paths to the correct controller
  functions and middleware.

  Some routes are public (anyone can browse/search notes),
  while others are protected (only logged-in users can
  create, edit, or delete notes).

  LEARNING TOPICS:
  - Express Router
  - Route Definitions (GET, POST, PUT, DELETE)
  - Middleware Chaining
  - Route Parameters (:id)
  - Protected vs Public Routes
  - RESTful API Design
  - Route Ordering (why it matters!)

  RECOMMENDED VIDEOS:
  Video: How to use Postman for Backend
  Video: Express Routing Complete Guide
  Video: RESTful API Design Best Practices

  YOUR TASKS:
  [ ] Understand the existing route definitions
  [ ] Know which routes are public vs protected
  [ ] Understand route parameter :id
  [ ] Understand why route ORDER matters

  ESTIMATED TIME:
  1 Hour (Study & Understand)

  ROUTE MAP:
  ┌─────────┬────────────────────┬────────────┬─────────────────────────┐
  │ Method  │ Path               │ Access     │ Controller              │
  ├─────────┼────────────────────┼────────────┼─────────────────────────┤
  │ GET     │ /api/notes/search  │ Public     │ searchNotes()           │
  │ GET     │ /api/notes/stats   │ Public     │ getStats()              │
  │ GET     │ /api/notes         │ Public     │ getAllNotes()            │
  │ POST    │ /api/notes         │ Protected  │ createNote()            │
  │ GET     │ /api/notes/my      │ Protected  │ getMyNotes()            │
  │ PUT     │ /api/notes/:id     │ Protected  │ updateNote()            │
  │ DELETE  │ /api/notes/:id     │ Protected  │ deleteNote()            │
  └─────────┴────────────────────┴────────────┴─────────────────────────┘

  QUESTIONS FOR UNDERSTANDING:
  ──────────────────────────────────────────────

  Q: Why is GET /search defined BEFORE GET /?
  A: Express matches routes top-to-bottom. If GET / was first,
     then GET /search would match / with req.query containing "search".
     Always put specific routes before generic ones!

  Q: Why is GET /my defined AFTER POST /?
  A: /my needs the protect middleware. Grouping protected routes
     together keeps the code organized. But note: /my must come
     AFTER /search and /stats to avoid conflicts.

  Q: What does :id mean in PUT /:id and DELETE /:id?
  A: :id is a route parameter. Express captures whatever value
     is in that URL segment and puts it in req.params.id.
     Example: PUT /api/notes/abc123 → req.params.id = "abc123"

  Q: Why do protected POST and PUT routes use noteValidation?
  A: noteValidation checks that title, description, subject, and
     driveLink are all present and valid BEFORE the controller runs.
     This prevents creating/updating notes with invalid data.

  Q: Why doesn't DELETE use noteValidation?
  A: DELETE doesn't need a request body — it only needs the :id
     from the URL to know which note to delete.

  CHECKLIST:
  [ ] Understand why route order matters
  [ ] Understand the :id route parameter
  [ ] Can explain which routes need protect middleware
  [ ] Can explain which routes need noteValidation

==================================================
*/

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createNote,
  getAllNotes,
  getMyNotes,
  searchNotes,
  updateNote,
  deleteNote,
  getStats,
  noteValidation,
} = require('../controllers/noteController');

// ──────────────────────────────────────────────
// Public Routes (no authentication needed)
// ──────────────────────────────────────────────
// ⚠️ IMPORTANT: /search and /stats MUST come before /
// because Express matches routes top-to-bottom!

// GET /api/notes/search?q=... — Search notes by keyword
router.get('/search', searchNotes);

// GET /api/notes/stats — Get platform statistics
router.get('/stats', getStats);

// GET /api/notes?subject=DSA&page=1&limit=12 — Browse all notes
router.get('/', getAllNotes);

// ──────────────────────────────────────────────
// Protected Routes (JWT token required)
// ──────────────────────────────────────────────

// POST /api/notes — Create a new note
// Middleware chain: protect → noteValidation → createNote
router.post('/', protect, noteValidation, createNote);

// GET /api/notes/my — Get the current user's notes
// Middleware chain: protect → getMyNotes
router.get('/my', protect, getMyNotes);

// PUT /api/notes/:id — Update a note (owner only)
// Middleware chain: protect → noteValidation → updateNote
router.put('/:id', protect, noteValidation, updateNote);

// DELETE /api/notes/:id — Delete a note (owner only)
// Middleware chain: protect → deleteNote
router.delete('/:id', protect, deleteNote);

module.exports = router;
