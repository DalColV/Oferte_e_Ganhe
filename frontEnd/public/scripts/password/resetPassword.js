document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmeSenha = document.getElementById('confirmeSenha').value;

    const response = await fetch('http://localhost:3000/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, novaSenha, confirmeSenha }),
    });

    const result = await response.json();

    if (response.ok) {
        alert('Senha redefinida com sucesso!');
        window.location = '/login'
    } else {
        alert(result.message || 'Erro ao redefinir a senha');
    }
});
