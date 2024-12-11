document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('cadastroLojaForm').addEventListener('submit', async function (e) {
      e.preventDefault(); 
  
      const storeId = document.getElementById('codigo-loja').value; 
      const storeName = document.getElementById('nome').value; 
      const cep = document.getElementById('CEP').value; 
      const street = document.getElementById('rua').value; 
      const number = document.getElementById('numero').value; 
      const isMatriz = document.getElementById('matriz').checked; 
  

      const dadosLoja = {
        store_id: storeId,
        store_name: storeName,
        cep: cep,
        street: street,
        number: number,
        is_matriz: isMatriz,
      };
      console.log(dadosLoja);  

      try {
        const response = await fetch('http://localhost:3000/store-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosLoja), 
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert('Loja cadastrada com sucesso!');
          document.getElementById('cadastroLojaForm').reset();
          window.location.href = '/store-management'
        } else {
          alert('Erro ao cadastrar loja: ' + result.message);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao cadastrar loja.');
      }
    });
  });
  

  function voltarPagina() {
    window.history.back();
  }