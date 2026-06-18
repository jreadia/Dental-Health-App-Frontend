fetch('https://dental-health-backend-x7b5.onrender.com/api/v1/auth/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'wrong@example.com', password: 'wrongpass' })
})
.then(async res => {
  console.log('Status:', res.status);
  console.log('Body:', await res.text());
})
.catch(err => console.error(err));
