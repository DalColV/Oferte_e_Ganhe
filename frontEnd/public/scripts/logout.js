document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.btn-logout'); 
    if (logoutButton) {
      logoutButton.addEventListener('click', async () => {
        try {
          const response = await fetch('/logout', { method: 'POST' });
  
          if (response.ok) {
            window.location.href = '/login'; 
          } else {
            alert('Logout failed.');
          }
        } catch (error) {
          console.error('Logout error:', error);
          alert('An error occurred.');
        }
      });
    } else {
      console.error('Botão de logout não encontrado.');
    }
  });
  