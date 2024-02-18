// index.js
const express = require('express');
const app = express();

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