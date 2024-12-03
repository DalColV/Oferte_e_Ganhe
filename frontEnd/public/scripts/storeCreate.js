document.addEventListener("DOMContentLoaded", function () {
    // Evento para capturar o envio do formulário
    document.getElementById('cadastroLojaForm').addEventListener('submit', async function (e) {
      e.preventDefault(); // Previne o envio padrão do formulário
  
      // Captura os valores dos campos do formulário
      const storeId = document.getElementById('codigo-loja').value; // store_id
      const storeName = document.getElementById('nome').value; // store_name
      const cep = document.getElementById('CEP').value; // CEP
      const street = document.getElementById('rua').value; // street
      const number = document.getElementById('numero').value; // number
      const isMatriz = document.getElementById('matriz').checked; // matriz
  
      console.log("CEP capturado: ", cep); // Verifique se o valor de CEP está correto
  
      // Valida o campo 'CEP' para garantir que não esteja vazio
      if (!cep || cep.trim() === "") {
        return alert("O campo 'CEP' é obrigatório.");
      }
  
      // Cria o objeto com os dados da loja
      const dadosLoja = {
        store_id: storeId,
        store_name: storeName,
        cep: cep,
        street: street,
        number: number,
        is_matriz: isMatriz,
      };
      console.log(dadosLoja);  // Verifique se o valor está sendo capturado corretamente

      try {
        // Envia os dados para o backend via POST
        const response = await fetch('http://localhost:3000/store-register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosLoja), // Envia os dados em formato JSON
        });
  
        // Processa a resposta do servidor
        const result = await response.json();
  
        if (response.ok) {
          alert('Loja cadastrada com sucesso!');
          // Limpa o formulário após o cadastro
          document.getElementById('cadastroLojaForm').reset();
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