/*
==================================================

  ROLE OWNER:
  Database Engineer

  FILE:
  models/User.js

  PURPOSE:
  Defines the User data model (schema) for MongoDB.
  This model determines what a "user" looks like in our database.
  It also handles password hashing before saving.

  LEARNING TOPICS:
  - Mongoose Schemas & Models
  - Schema Validation (required, unique, minlength, maxlength)
  - Pre-save Middleware (Hooks)
  - bcrypt Password Hashing
  - Instance Methods on Mongoose Models
  - Data Modelling Best Practices

  RECOMMENDED VIDEOS:
  Video: Data Modelling for Backend with Mongoose
  Video: User and Video Model with Hooks and JWT
  Video: Complete Guide to Mongoose Schemas

  YOUR TASKS:
  [ ] Define the User schema with name, email, password fields
  [ ] Add proper validation rules for each field
  [ ] Implement pre-save hook to hash passwords
  [ ] Implement matchPassword instance method
  [ ] Export the User model

  ESTIMATED TIME:
  2-3 Hours

  API CONTRACT:
  This file exports a Mongoose model called "User"
  Schema fields:
    - name:     String, required, trimmed, max 50 chars
    - email:    String, required, unique, lowercase, trimmed, valid email format
    - password: String, required, min 6 chars, select: false (hidden by default)
  Timestamps: enabled (createdAt, updatedAt auto-generated)
  Methods:
    - matchPassword(enteredPassword) → returns boolean

  CHECKLIST:
  [ ] Schema has name, email, password fields
  [ ] Validation rules match the API contract above
  [ ] select: false is set on password field
  [ ] Pre-save hook hashes password with bcrypt
  [ ] isModified('password') check prevents re-hashing
  [ ] matchPassword method compares passwords correctly
  [ ] Model is exported as 'User'

==================================================
*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/*
──────────────────────────────────────────────
TODO 1: Define the User Schema
──────────────────────────────────────────────

Create a new mongoose.Schema with three fields:

1. name:
   - type: String
   - required: true (with message 'Name is required')
   - trim: true
   - maxlength: 50

2. email:
   - type: String
   - required: true (with message 'Email is required')
   - unique: true
   - lowercase: true
   - trim: true
   - match: /^\S+@\S+\.\S+$/ (basic email validation)

3. password:
   - type: String
   - required: true (with message 'Password is required')
   - minlength: 6
   - select: false (so password is NOT returned in queries by default)

Also enable timestamps: { timestamps: true }

Hint:
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], ... },
    ...
  },
  { timestamps: true }
);
──────────────────────────────────────────────
*/

const userSchema = new mongoose.Schema(
  {
    // ⬇️ Define your schema fields here

  },
  {
    timestamps: true,
  }
);

/*
──────────────────────────────────────────────
TODO 2: Hash password before saving
──────────────────────────────────────────────

Use a pre-save hook (middleware) so that every time
a User is saved, the password gets hashed automatically.

Important: Only hash if the password field was modified!
This prevents re-hashing an already-hashed password.

Hint:
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

Why genSalt(12)?
  - The number is the "salt rounds" (cost factor)
  - Higher = more secure but slower
  - 10-12 is a good balance for most apps
──────────────────────────────────────────────
*/

// ⬇️ Implement your pre-save hook here


/*
──────────────────────────────────────────────
TODO 3: Add matchPassword instance method
──────────────────────────────────────────────

This method lets us compare a plain-text password
(from a login attempt) against the hashed password
stored in the database.

Hint:
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

bcrypt.compare() returns true if they match, false otherwise.
──────────────────────────────────────────────
*/

// ⬇️ Implement your matchPassword method here


module.exports = mongoose.model('User', userSchema);
