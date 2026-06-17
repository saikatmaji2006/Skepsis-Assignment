/*
==================================================

  ROLE OWNER:
  Database Engineer

  FILE:
  config/db.js

  PURPOSE:
  Establishes connection to MongoDB Atlas using Mongoose.
  This is the first file that runs when the server starts.
  Without a working database connection, nothing else works.

  LEARNING TOPICS:
  - Mongoose Connection
  - Environment Variables (process.env)
  - Async/Await
  - Error Handling with try/catch
  - MongoDB Atlas Setup

  RECOMMENDED VIDEOS:
  Video: Data Modelling for Backend with Mongoose
  Video: How to Connect MongoDB Atlas with Node.js
  Video: Environment Variables in Node.js

  YOUR TASKS:
  [ ] Read MONGO_URI from environment variables
  [ ] Connect to MongoDB using mongoose.connect()
  [ ] Log success message on connection
  [ ] Handle connection errors gracefully
  [ ] Handle disconnection and reconnection events
  [ ] Export the connectDB function

  ESTIMATED TIME:
  1-2 Hours

  API CONTRACT:
  This file exports a single async function: connectDB()
  - On success: logs "MongoDB Connected: <host>"
  - On failure: logs error and exits process with code 1

  CHECKLIST:
  [ ] mongoose.connect() is called with MONGO_URI
  [ ] Connection success is logged
  [ ] Connection errors are caught and logged
  [ ] Disconnection events are handled
  [ ] Reconnection events are handled
  [ ] process.exit(1) is called on fatal connection failure
  [ ] Function is exported with module.exports

==================================================
*/

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    /*
    ──────────────────────────────────────────────
    TODO 1: Connect to MongoDB
    ──────────────────────────────────────────────

    Use mongoose.connect() to connect to the database.

    The connection string is stored in process.env.MONGO_URI
    (see the .env.example file for setup instructions).

    Store the result in a variable called "conn" so you can
    log the host name.

    Hint:
    const conn = await mongoose.connect(process.env.MONGO_URI);

    Expected Output:
    ✅ MongoDB Connected: <cluster-host>
    ──────────────────────────────────────────────
    */


    /*
    ──────────────────────────────────────────────
    TODO 2: Log the successful connection
    ──────────────────────────────────────────────

    After connecting, log a success message that includes
    the host name from the connection object.

    Hint:
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    ──────────────────────────────────────────────
    */


    /*
    ──────────────────────────────────────────────
    TODO 3: Set up connection event listeners
    ──────────────────────────────────────────────

    MongoDB connections can drop unexpectedly.
    Set up event listeners for:

    - 'error'        → Log the error message
    - 'disconnected' → Log a warning
    - 'reconnected'  → Log that connection was restored

    Hint:
    mongoose.connection.on('error', (err) => { ... });
    mongoose.connection.on('disconnected', () => { ... });
    mongoose.connection.on('reconnected', () => { ... });
    ──────────────────────────────────────────────
    */


    // ⬆️ Remove this line once you implement the TODOs above
    console.log('⚠️  Database connection not yet implemented (Assignment Pending)');

  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
