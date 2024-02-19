const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();

// Create a database connection and initialize a table for users
const db = new sqlite3.Database('db/mydb.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    db.run('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)');
  }
});

// Insert a new user into the database (use placeholders to prevent SQL injection)
const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
insertUser.run(['username', 'password']);
insertUser.finalize();

// Get the user's password from the database
const getUsernamePassword = db.prepare('SELECT password FROM users WHERE username = ?');
getUsernamePassword.get(['username'], (err, row) => {
  if (err) {
    console.error('Error getting user password:', err.message);
  } else {
    // The user's password is stored in the `row.password` property
  }
});
getUsernamePassword.finalize();

// Close the database connection (move this to a callback or use promises for better control)
db.close();

app.use(bodyParser.json()); // Use body-parser for handling JSON data

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Use a secure password comparison method, consider using bcrypt or a similar library
  const isValidUser = username === 'username' && password === 'password';

  res.json({ success: isValidUser });
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Super-Happiness is listening on port ${PORT}!`);
});
