document.addEventListener('DOMContentLoaded', async () => {
  const storeSelect = document.getElementById('loja');

  if (!storeSelect) {
    console.error("Elemento 'loja' não encontrado no DOM.");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/stores');
    if (!response.ok) throw new Error('Erro ao buscar lojas');

    const result = await response.json();
    console.log('Resposta do servidor:', result); // Verificar retorno

    const stores = result.data || [];
    stores.forEach((store) => {
      const option = document.createElement('option');
      option.value = store.store_id;
      option.textContent = store.store_id; // Exibe o nome da loja
      storeSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar lojas:', error);
    alert('Erro ao carregar lojas. Por favor, tente novamente mais tarde.');
  }
});

document.getElementById('submit-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const store_id = document.getElementById('loja').value;
  const recommended_quantity = document.getElementById('qtd-recomendada').value;
  const min_quantity = document.getElementById('qtd-minima').value;
  const current_quantity = document.getElementById('qtd-atual').value;

  // Validação de campos vazios
  if (!store_id || !recommended_quantity || !min_quantity || !current_quantity) {
    return;
  }

  // Replicar o store_id para inventory_id
  const estoqueData = {
    store_id,
    inventory_id: store_id,  // Define inventory_id igual a store_id
    recommended_quantity,
    min_quantity,
    current_quantity
  };

  console.log('Dados enviados ao servidor:', estoqueData); // Log para depuração

  fetch('http://localhost:3000/inventory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(estoqueData)
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.message || 'Erro ao cadastrar estoque.');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Resposta do servidor:', data); // Log da resposta do servidor
      alert('Estoque cadastrado com sucesso!');
      window.location.href = '/inventory-management'
    })
    .catch(error => {
      console.error('Erro:', error);
      alert(`Erro ao cadastrar o estoque: ${error.message}`);
    });
});

function voltarPagina() {
  window.location.href = '/inventory-management';
}
