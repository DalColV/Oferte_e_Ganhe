document.getElementById('resetPasswordRequestForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;

  try {
      const response = await fetch('http://localhost:3000/password-reset-request', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
      });

      const data = await response.json();
      alert(data.message);
      window.location.href = '../login';

  } catch (error) {
      console.error(error);
      alert('Erro ao enviar o e-mail.');
  }
});