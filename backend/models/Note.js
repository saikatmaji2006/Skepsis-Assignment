/*
==================================================

  ROLE OWNER:
  Database Engineer

  FILE:
  models/Note.js

  PURPOSE:
  Defines the Note data model (schema) for MongoDB.
  Notes are the core resource of StudyBuddy — each note
  represents a shared academic resource (title, description,
  subject, Google Drive link) uploaded by a user.

  LEARNING TOPICS:
  - Mongoose Schemas & Models
  - Schema Validation (required, enum, maxlength, custom validators)
  - ObjectId References (Relationships between models)
  - Text Indexes for Search
  - Data Modelling Best Practices

  RECOMMENDED VIDEOS:
  Video: Data Modelling for Backend with Mongoose
  Video: Complete Guide to Mongoose Schemas
  Video: MongoDB Indexes Explained

  YOUR TASKS:
  [ ] Define the SUBJECTS array (list of valid subjects)
  [ ] Define the Note schema with all fields
  [ ] Add proper validation for each field
  [ ] Set up the uploadedBy reference to User model
  [ ] Create a text index for search functionality
  [ ] Export the Note model AND the SUBJECTS array

  ESTIMATED TIME:
  2-3 Hours

  API CONTRACT:
  This file exports:
    - Default: Mongoose model called "Note"
    - Named:  SUBJECTS array

  Schema fields:
    - title:       String, required, trimmed, max 150 chars
    - description: String, required, trimmed, max 1000 chars
    - subject:     String, required, must be one of SUBJECTS (enum)
    - driveLink:   String, required, trimmed, must match Google Drive URL
    - uploadedBy:  ObjectId, ref 'User', required
  Timestamps: enabled

  SUBJECTS array:
    ['DSA', 'DBMS', 'Operating Systems', 'Computer Networks',
     'Machine Learning', 'Artificial Intelligence', 'Web Development',
     'Java', 'Python', 'C++', 'General']

  CHECKLIST:
  [ ] SUBJECTS array is defined and exported
  [ ] Schema has all 5 fields (title, description, subject, driveLink, uploadedBy)
  [ ] Validation rules match the API contract
  [ ] driveLink has custom validator for Google Drive URLs
  [ ] uploadedBy references the User model
  [ ] Text index is created on title, description, subject
  [ ] Model and SUBJECTS are both exported

==================================================
*/

const mongoose = require('mongoose');

/*
──────────────────────────────────────────────
TODO 1: Define the SUBJECTS array
──────────────────────────────────────────────

Create a constant array of valid subject categories.
This array is used for the "enum" validation on the
subject field AND is exported for use in other files
(like the controller's validation rules).

The subjects should be:
  'DSA', 'DBMS', 'Operating Systems', 'Computer Networks',
  'Machine Learning', 'Artificial Intelligence', 'Web Development',
  'Java', 'Python', 'C++', 'General'

Hint:
const SUBJECTS = ['DSA', 'DBMS', ...];
──────────────────────────────────────────────
*/

const SUBJECTS = [
  // ⬇️ Add the subject strings here
];

/*
──────────────────────────────────────────────
TODO 2: Define the Note Schema
──────────────────────────────────────────────

Create a mongoose.Schema with these fields:

1. title:
   - type: String, required, trim, maxlength: 150

2. description:
   - type: String, required, trim, maxlength: 1000

3. subject:
   - type: String, required
   - enum: { values: SUBJECTS, message: '{VALUE} is not a valid subject' }

4. driveLink:
   - type: String, required, trim
   - validate: custom validator that checks the URL starts with
     https://drive.google.com or https://docs.google.com
   - Hint for validator:
     validator: function (v) {
       return /^https:\/\/(drive\.google\.com|docs\.google\.com)/.test(v);
     }

5. uploadedBy:
   - type: mongoose.Schema.Types.ObjectId
   - ref: 'User'
   - required: true

Also enable { timestamps: true }

Hint:
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], ... },
    ...
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);
──────────────────────────────────────────────
*/

const noteSchema = new mongoose.Schema(
  {
    // ⬇️ Define your schema fields here

  },
  {
    timestamps: true,
  }
);

/*
──────────────────────────────────────────────
TODO 3: Create a text index for search
──────────────────────────────────────────────

Text indexes allow MongoDB to perform text-based searches
efficiently. We want users to be able to search notes by
title, description, or subject.

Hint:
noteSchema.index({ title: 'text', description: 'text', subject: 'text' });
──────────────────────────────────────────────
*/

// ⬇️ Create your text index here


module.exports = mongoose.model('Note', noteSchema);
module.exports.SUBJECTS = SUBJECTS;
