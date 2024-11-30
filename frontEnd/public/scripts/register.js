document.addEventListener('DOMContentLoaded', async () => {
    const storeSelect = document.getElementById('loja'); 

    if (!storeSelect) {
        console.error("Elemento 'loja' não encontrado no DOM.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/stores');
        if (!response.ok) throw new Error('Error fetching stores');

        const result = await response.json();
        const stores = result.data; 
        stores.forEach((store) => {
            const option = document.createElement('option');
            option.value = store.store_id;
            option.textContent = store.store_name;
            storeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading stores:', error);
        alert('Error loading stores. Please try again later.');
    }
});


document.querySelector('.btn-padrao').addEventListener('click', async (event) => {
    event.preventDefault();
  
    // Capturar valores dos campos
    const username = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const store_id = document.getElementById('loja').value;
    const registration = document.getElementById('matricula').value;
    const password = document.getElementById('senha').value;
  
    // Montar o payload para envio ao backend
    const userData = {
      registration: registration,
      username: username,
      store_id: store_id,
      email: email,
      password: password,
    };
  
    // Enviar os dados ao backend
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Usuário cadastrado com sucesso!');
        console.log(data); 
        window.location.href = '../login';
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar: ${errorData.message || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro inesperado ao cadastrar usuário.');
    }
  });
  

  