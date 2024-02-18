// src/js/main.js
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  const data = {
    username,
    password
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      alert('Invalid username or password');
    }
  })
  .catch(err => {
    console.error(err);
    alert('An error occurred. Please try again.');
  });
});