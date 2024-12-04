document.getElementById('submit-form').addEventListener('click', function(event) {
    event.preventDefault(); 
  
    const store_id = document.getElementById('loja').value;
    const recommended_quantity = document.getElementById('qtd-recomendada').value;
    const min_quantity = document.getElementById('qtd-minima').value;
    const currenty_quantity = document.getElementById('qtd-atual').value;
  
    if (!store_id || !recommended_quantity || !min_quantity || !currenty_quantity) {
      return;
    }
  
    const estoqueData = {
        store_id,
        recommended_quantity: qtdRecomendada,
        min_quantity: qtdMinima,
        currenty_quantity: qtdAtual
    };
  
    fetch('/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(estoqueData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Estoque cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar o estoque. Tente novamente.');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao cadastrar o estoque. Tente novamente.');
    });
  });
  
  function voltarPagina() {
    window.location.href = '/inventory-management';
}
window.voltarPagina = voltarPagina;