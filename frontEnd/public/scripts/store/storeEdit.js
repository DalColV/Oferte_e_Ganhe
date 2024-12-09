
const storeIdInput = document.getElementById('store-id');
const storeNameInput = document.getElementById('store-name');
const storeStreetInput = document.getElementById('rua');
const storeCepInput = document.getElementById('cep');
const storeNumberInput = document.getElementById('numero');
const storeMatrizCheckbox = document.getElementById('store-matriz');
const form = document.querySelector('.formulario-padrao');

const storeId = new URLSearchParams(window.location.search).get('id');

async function fetchStoreData() {
  try {
    const response = await fetch(`/stores/${storeId}`);
    if (!response.ok) throw new Error('Erro ao buscar os dados da loja');

     
    const result = await response.json();
    const data = result.data;

    storeIdInput.value = data.store_id;
    storeNameInput.value = data.store_name;
    storeStreetInput.value = data.street;
    storeCepInput.value = data.cep;
    storeNumberInput.value = data.number;
    storeMatrizCheckbox.checked = data.is_matriz;
  } catch (error) {
    console.error(error);
    alert('Não foi possível carregar os dados da loja.');
  }
}

async function saveStoreData(event) {
  event.preventDefault(); 

  const updatedData = {
    store_id: storeIdInput.value,
    store_name: storeNameInput.value,
    street: storeStreetInput.value,
    cep: storeCepInput.value,
    number: storeNumberInput.value,
    is_matriz: storeMatrizCheckbox.checked
  };

  try {
    const response = await fetch(`/store-edit/${storeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) throw new Error('Erro ao salvar os dados da loja');

    window.location.href = '/store-management';

  } catch (error) {
    console.error(error);
    alert('Não foi possível salvar os dados da loja.');
  }
}

window.onload = fetchStoreData;

form.addEventListener('submit', saveStoreData);
