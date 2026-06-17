/*
==================================================

  ROLE OWNER:
  CRUD Engineer A (createNote, getAllNotes, getMyNotes)
  CRUD Engineer B (updateNote, deleteNote, searchNotes)

  FILE:
  controllers/noteController.js

  PURPOSE:
  Handles all CRUD operations for notes — the core resource
  of StudyBuddy. This is the biggest controller file and is
  shared between two team members.

  CRUD Engineer A handles: createNote, getAllNotes, getMyNotes
  CRUD Engineer B handles: updateNote, deleteNote, searchNotes
  getStats is a bonus task for either engineer.

  LEARNING TOPICS:
  - Express Controllers (req, res, next)
  - Mongoose CRUD Operations (create, find, findById, findByIdAndDelete)
  - Mongoose Query Methods (populate, sort, skip, limit)
  - Pagination Logic
  - Search with Regex
  - Ownership Checks (Authorization)
  - MongoDB Aggregation Pipeline
  - Request Validation with express-validator

  RECOMMENDED VIDEOS:
  Video: Logic Building | Register Controller
  Video: How to use Postman for Backend
  Video: MongoDB CRUD Operations with Mongoose
  Video: Building REST APIs with Express

  YOUR TASKS (CRUD Engineer A):
  [ ] Implement createNote()
  [ ] Implement getAllNotes() with filtering & pagination
  [ ] Implement getMyNotes()

  YOUR TASKS (CRUD Engineer B):
  [ ] Implement updateNote() with ownership check
  [ ] Implement deleteNote() with ownership check
  [ ] Implement searchNotes()

  BONUS TASK (Either Engineer):
  [ ] Implement getStats() with aggregation

  ESTIMATED TIME:
  4-6 Hours (per engineer)

  CHECKLIST:
  [ ] All 7 controller functions work in Postman
  [ ] Proper HTTP status codes (200, 201, 400, 403, 404)
  [ ] Ownership checks prevent unauthorized edits/deletes
  [ ] Pagination works correctly
  [ ] Search finds notes by title, description, or subject
  [ ] Error handling with try/catch and next(error)

==================================================
*/

const { validationResult, body } = require('express-validator');
const Note = require('../models/Note');
const User = require('../models/User');

// Validation rules (DO NOT MODIFY — these are already complete)
const noteValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isIn(Note.SUBJECTS)
    .withMessage('Invalid subject'),
  body('driveLink')
    .trim()
    .notEmpty()
    .withMessage('Google Drive link is required')
    .matches(/^https:\/\/(drive\.google\.com|docs\.google\.com)/)
    .withMessage('Please provide a valid Google Drive link'),
];


/* ═══════════════════════════════════════════════
   CRUD ENGINEER A — Your Section Starts Here
   ═══════════════════════════════════════════════ */


/*
==================================================
ENDPOINT: POST /api/notes
──────────────────────────────────────────────

HEADERS:
Authorization: Bearer <token>

INPUT:
{
  "title": "DSA Complete Notes",
  "description": "Covers arrays, linked lists, trees, graphs",
  "subject": "DSA",
  "driveLink": "https://drive.google.com/file/d/abc123"
}

SUCCESS RESPONSE (201):
{
  "success": true,
  "note": {
    "_id": "...",
    "title": "DSA Complete Notes",
    "description": "...",
    "subject": "DSA",
    "driveLink": "https://drive.google.com/...",
    "uploadedBy": { "_id": "...", "name": "John", "email": "john@example.com" },
    "createdAt": "...",
    "updatedAt": "..."
  }
}
==================================================
*/

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res, next) => {
  try {
    // Validation check (DO NOT MODIFY)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    /*
    ──────────────────────────────────────────────
    TODO 1 (CRUD Engineer A): Create a Note
    ──────────────────────────────────────────────

    Step 1: Extract title, description, subject, driveLink from req.body
    Hint: const { title, description, subject, driveLink } = req.body;

    Step 2: Create a new note in the database
    Hint:
    const note = await Note.create({
      title,
      description,
      subject,
      driveLink,
      uploadedBy: req.user._id,
    });

    Step 3: Populate the uploadedBy field with user details
    Hint: const populated = await note.populate('uploadedBy', 'name email');

    Step 4: Return the created note with 201 status
    Hint:
    res.status(201).json({
      success: true,
      note: populated,
    });
    ──────────────────────────────────────────────
    */

    // ⬇️ Remove this return once you implement the TODO above
    return res.status(501).json({
      message: "Assignment Pending"
    });

  } catch (error) {
    next(error);
  }
};

/*
==================================================
ENDPOINT: GET /api/notes
──────────────────────────────────────────────

QUERY PARAMS (all optional):
  ?subject=DSA       — Filter by subject
  ?page=1            — Page number (default: 1)
  ?limit=12          — Results per page (default: 12)

SUCCESS RESPONSE (200):
{
  "success": true,
  "notes": [ ... ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5
  }
}
==================================================
*/

// @desc    Get all notes (with optional subject filter & pagination)
// @route   GET /api/notes
// @access  Public
const getAllNotes = async (req, res, next) => {
  try {
    /*
    ──────────────────────────────────────────────
    TODO 2 (CRUD Engineer A): Get All Notes
    ──────────────────────────────────────────────

    Step 1: Extract query parameters
    Hint: const { subject, page = 1, limit = 12 } = req.query;

    Step 2: Build a filter object
    Hint:
    const filter = {};
    if (subject && subject !== 'All') {
      filter.subject = subject;
    }

    Step 3: Count total matching documents (for pagination)
    Hint: const total = await Note.countDocuments(filter);

    Step 4: Fetch notes with populate, sort, skip, limit
    Hint:
    const notes = await Note.find(filter)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    Step 5: Return notes with pagination info
    Hint:
    res.json({
      success: true,
      notes,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
    ──────────────────────────────────────────────
    */

    // ⬇️ Remove this return once you implement the TODO above
    return res.status(501).json({
      message: "Assignment Pending"
    });

  } catch (error) {
    next(error);
  }
};

/*
==================================================
ENDPOINT: GET /api/notes/my
──────────────────────────────────────────────

HEADERS:
Authorization: Bearer <token>

SUCCESS RESPONSE (200):
{
  "success": true,
  "notes": [ ... ]
}
==================================================
*/

// @desc    Get logged-in user's notes
// @route   GET /api/notes/my
// @access  Private
const getMyNotes = async (req, res, next) => {
  try {
    /*
    ──────────────────────────────────────────────
    TODO 3 (CRUD Engineer A): Get My Notes
    ──────────────────────────────────────────────

    Fetch only the notes uploaded by the currently
    logged-in user.

    Step 1: Find notes where uploadedBy matches the current user
    Hint:
    const notes = await Note.find({ uploadedBy: req.user._id })
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    Step 2: Return the notes
    Hint:
    res.json({
      success: true,
      notes,
    });
    ──────────────────────────────────────────────
    */

    // ⬇️ Remove this return once you implement the TODO above
    return res.status(501).json({
      message: "Assignment Pending"
    });

  } catch (error) {
    next(error);
  }
};


/* ═══════════════════════════════════════════════
   CRUD ENGINEER B — Your Section Starts Here
   ═══════════════════════════════════════════════ */


/*
==================================================
ENDPOINT: GET /api/notes/search
──────────────────────────────────────────────

QUERY PARAMS:
  ?q=arrays          — Search query (required)

SUCCESS RESPONSE (200):
{
  "success": true,
  "notes": [ ... ]
}

ERROR RESPONSE (400):
{
  "success": false,
  "message": "Search query is required"
}
==================================================
*/

// @desc    Search notes by title, description, or subject
// @route   GET /api/notes/search
// @access  Public
const searchNotes = async (req, res, next) => {
  try {
    /*
    ──────────────────────────────────────────────
    TODO 4 (CRUD Engineer B): Search Notes
    ──────────────────────────────────────────────

    Step 1: Extract the search query from req.query
    Hint: const { q } = req.query;

    Step 2: Validate — if empty, return 400 error
    Hint:
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    Step 3: Create a case-insensitive regex
    Hint: const regex = new RegExp(q.trim(), 'i');

    Step 4: Search across title, description, and subject using $or
    Hint:
    const notes = await Note.find({
      $or: [
        { title: regex },
        { description: regex },
        { subject: regex },
      ],
    })
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(20);

    Step 5: Return the matching notes
    ──────────────────────────────────────────────
    */

    // ⬇️ Remove this return once you implement the TODO above
    return res.status(501).json({
      message: "Assignment Pending"
    });

  } catch (error) {
    next(error);
  }
};

/*
==================================================
ENDPOINT: PUT /api/notes/:id
──────────────────────────────────────────────

HEADERS:
Authorization: Bearer <token>

INPUT:
{
  "title": "Updated Title",
  "description": "Updated description",
  "subject": "DBMS",
  "driveLink": "https://drive.google.com/file/d/xyz789"
}

SUCCESS RESPONSE (200):
{
  "success": true,
  "note": { ... }
}

ERROR RESPONSE (403):
{
  "success": false,
  "message": "Not authorized to update this resource"
}

ERROR RESPONSE (404):
{
  "success": false,
  "message": "Resource not found"
}
==================================================
*/

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private (owner only)
const updateNote = async (req, res, next) => {
  try {
    // Validation check (DO NOT MODIFY)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    /*
    ──────────────────────────────────────────────
    TODO 5 (CRUD Engineer B): Update a Note
    ──────────────────────────────────────────────

    Step 1: Find the note by ID
    Hint: let note = await Note.findById(req.params.id);

    Step 2: If not found, return 404
    Hint:
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
      });
    }

    Step 3: Check ownership — only the uploader can update!
    Hint:
    if (note.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this resource',
      });
    }

    Step 4: Update the note fields
    Hint:
    const { title, description, subject, driveLink } = req.body;
    note.title = title || note.title;
    note.description = description || note.description;
    note.subject = subject || note.subject;
    note.driveLink = driveLink || note.driveLink;

    Step 5: Save and return the updated note
    Hint:
    await note.save();
    const updated = await Note.findById(note._id).populate('uploadedBy', 'name email');
    res.json({ success: true, note: updated });
    ──────────────────────────────────────────────
    */

    // ⬇️ Remove this return once you implement the TODO above
    return res.status(501).json({
      message: "Assignment Pending"
    });

  } catch (error) {
    next(error);
  }
};

/*
==================================================
ENDPOINT: DELETE /api/notes/:id
──────────────────────────────────────────────

HEADERS:
Authorization: Bearer <token>

SUCCESS RESPONSE (200):
{
  "success": true,
  "message": "Resource deleted successfully"
}

ERROR RESPONSE (403):
{
  "success": false,
  "message": "Not authorized to delete this resource"
}

ERROR RESPONSE (404):
{
  "success": false,
  "message": "Resource not found"
}
==================================================
*/

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private (owner only)
const deleteNote = async (req, res, next) => {
  try {
    /*
    ──────────────────────────────────────────────
    TODO 6 (CRUD Engineer B): Delete a Note
    ──────────────────────────────────────────────

    Step 1: Find the note by ID
    Hint: const note = await Note.findById(req.params.id);

    Step 2: If not found, return 404

    Step 3: Check ownership — only the uploader can delete!
    Hint: note.uploadedBy.toString() !== req.user._id.toString()

    Step 4: Delete the note
    Hint: await Note.findByIdAndDelete(req.params.id);

    Step 5: Return success message
    Hint:
    res.json({
      success: true,
      message: 'Resource deleted successfully',
    });
    ──────────────────────────────────────────────
    */

    // ⬇️ Remove this return once you implement the TODO above
    return res.status(501).json({
      message: "Assignment Pending"
    });

  } catch (error) {
    next(error);
  }
};

/*
==================================================
ENDPOINT: GET /api/notes/stats
──────────────────────────────────────────────

SUCCESS RESPONSE (200):
{
  "success": true,
  "stats": {
    "totalNotes": 50,
    "totalUsers": 10,
    "totalSubjects": 8,
    "weeklyNotes": 5,
    "subjectBreakdown": [
      { "_id": "DSA", "count": 12 },
      { "_id": "DBMS", "count": 8 }
    ]
  }
}
==================================================
*/

// @desc    Get platform statistics
// @route   GET /api/notes/stats
// @access  Public
const getStats = async (req, res, next) => {
  try {
    /*
    ──────────────────────────────────────────────
    BONUS TODO: Get Platform Statistics
    ──────────────────────────────────────────────

    This is a BONUS task! It uses MongoDB Aggregation,
    which is a more advanced topic.

    Step 1: Count total notes
    Hint: const totalNotes = await Note.countDocuments();

    Step 2: Count total users
    Hint: const totalUsers = await User.countDocuments();

    Step 3: Get subject breakdown using aggregation
    Hint:
    const subjectStats = await Note.aggregate([
      { $group: { _id: '$subject', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    Step 4: Count notes shared this week
    Hint:
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyNotes = await Note.countDocuments({
      createdAt: { $gte: oneWeekAgo },
    });

    Step 5: Return all stats
    ──────────────────────────────────────────────
    */

    // ⬇️ Remove this return once you implement the TODO above
    return res.status(501).json({
      message: "Assignment Pending"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getMyNotes,
  searchNotes,
  updateNote,
  deleteNote,
  getStats,
  noteValidation,
};
