const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

// Create a database connection
const db = new sqlite3.Database('db/mydb.sqlite');

// Create a table to store user usernames and passwords
db.run('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)');

// Insert a new user into the database
db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['username', 'password']);

// Get the user's password from the database
db.get('SELECT password FROM users WHERE username = ?', ['username'], (err, row) => {
  if (err) {
    throw err;
  }

  // The user's password is stored in the `row.password` property
});

// Close the database connection
db.close();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === 'username' && password === 'password') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

app.listen(3000, () => {
  console.log('Super-Happiness is listening on port 3000!');
});