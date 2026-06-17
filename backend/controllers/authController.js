/*
==================================================

  ROLE OWNER:
  Authentication Engineer

  FILE:
  controllers/authController.js

  PURPOSE:
  Handles user registration, login, and profile retrieval.
  This is the core authentication logic of the application.
  Every user interaction starts here — you can't use the app
  without registering and logging in first.

  LEARNING TOPICS:
  - bcrypt (Password Hashing & Comparison)
  - JWT (JSON Web Tokens) for Stateless Authentication
  - Express Controllers (req, res, next pattern)
  - Request Validation with express-validator
  - Error Handling in async Express routes
  - HTTP Status Codes (200, 201, 400, 401)

  RECOMMENDED VIDEOS:
  Video: User and Video Model with Hooks and JWT
  Video: Logic Building | Register Controller
  Video: How to use Postman for Backend
  Video: Complete JWT Authentication Tutorial

  YOUR TASKS:
  [ ] Implement generateToken() helper function
  [ ] Implement register() controller
  [ ] Implement login() controller
  [ ] Implement getMe() controller
  [ ] Return JWT Token on register and login
  [ ] Hash Passwords (handled in User model, but understand it!)

  ESTIMATED TIME:
  3-5 Hours

  CHECKLIST:
  [ ] generateToken() creates a valid JWT
  [ ] register() checks for duplicate emails
  [ ] register() creates a new user
  [ ] register() returns token + user info
  [ ] login() finds user by email
  [ ] login() compares passwords
  [ ] login() returns token + user info
  [ ] getMe() returns current user profile
  [ ] All endpoints use proper status codes
  [ ] All endpoints have error handling
  [ ] All APIs work in Postman

==================================================
*/

const jwt = require('jsonwebtoken');
const { validationResult, body } = require('express-validator');
const User = require('../models/User');

/*
──────────────────────────────────────────────
TODO 1: Implement generateToken()
──────────────────────────────────────────────

Create a helper function that takes a user ID
and returns a signed JWT token.

Use jwt.sign() with:
  - payload: { id }
  - secret: process.env.JWT_SECRET
  - options: { expiresIn: '30d' }

Hint:
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

Why 30d?
  - The token expires after 30 days
  - After that, the user must log in again
  - This is a common default for web apps
──────────────────────────────────────────────
*/

const generateToken = (id) => {
  // ⬇️ Implement JWT signing here
  return null;
};

// Validation rules (DO NOT MODIFY — these are already complete)
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

/*
==================================================
ENDPOINT: POST /api/auth/register
──────────────────────────────────────────────

INPUT:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

SUCCESS RESPONSE (201):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "60d5ec49f1b2c72b7c8e4b3a",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

ERROR RESPONSE (400 — duplicate email):
{
  "success": false,
  "message": "A user with that email already exists"
}

ERROR RESPONSE (400 — validation):
{
  "success": false,
  "message": "Name is required"
}
==================================================
*/

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
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
    TODO 2: Implement User Registration
    ──────────────────────────────────────────────

    Step 1: Extract name, email, password from req.body
    Hint: const { name, email, password } = req.body;

    Step 2: Check if a user with this email already exists
    Hint: const userExists = await User.findOne({ email });

    Step 3: If user exists, return 400 error
    Hint:
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with that email already exists',
      });
    }

    Step 4: Create the new user
    Hint: const user = await User.create({ name, email, password });
    (The password will be hashed automatically by the pre-save hook!)

    Step 5: Generate a JWT token
    Hint: const token = generateToken(user._id);

    Step 6: Return the token and user info
    Hint:
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
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
ENDPOINT: POST /api/auth/login
──────────────────────────────────────────────

INPUT:
{
  "email": "john@example.com",
  "password": "password123"
}

SUCCESS RESPONSE (200):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "60d5ec49f1b2c72b7c8e4b3a",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

ERROR RESPONSE (401):
{
  "success": false,
  "message": "Invalid email or password"
}
==================================================
*/

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
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
    TODO 3: Implement User Login
    ──────────────────────────────────────────────

    Step 1: Extract email, password from req.body
    Hint: const { email, password } = req.body;

    Step 2: Find user by email AND include the password field
    Hint: const user = await User.findOne({ email }).select('+password');
    (We need .select('+password') because password has select: false in schema)

    Step 3: If no user found, return 401 error
    Hint:
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    Step 4: Compare the entered password with the stored hash
    Hint: const isMatch = await user.matchPassword(password);

    Step 5: If password doesn't match, return 401 error

    Step 6: Generate JWT token and return with user info
    Hint:
    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
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
ENDPOINT: GET /api/auth/me
──────────────────────────────────────────────

HEADERS:
Authorization: Bearer <token>

SUCCESS RESPONSE (200):
{
  "success": true,
  "user": {
    "id": "60d5ec49f1b2c72b7c8e4b3a",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
==================================================
*/

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    /*
    ──────────────────────────────────────────────
    TODO 4: Implement Get Current User
    ──────────────────────────────────────────────

    The auth middleware (authMiddleware.js) already attaches
    the logged-in user to req.user. You just need to:

    Step 1: Find the user by ID
    Hint: const user = await User.findById(req.user._id);

    Step 2: Return the user's profile info
    Hint:
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
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

module.exports = {
  register,
  login,
  getMe,
  registerValidation,
  loginValidation,
};
