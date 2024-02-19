const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const { value: username } = document.querySelector('input[name="username"]');
    const { value: password } = document.querySelector('input[name="password"]');

    const data = { username, password };

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const { success } = await response.json();

    if (success) {
      window.location.href = '/dashboard';
    } else {
      alert('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.');
  }
});
