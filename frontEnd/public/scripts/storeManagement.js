let allStores = [];

// Função para buscar as Lojas do sistema
async function getStores() {
    try {
        const response = await fetch('/stores'); 
        const result = await response.json(); 

        console.log('Resposta da API de Lojas:', result); 

        if (Array.isArray(result.data)) {
            allStores = result.data; 
            renderTabelaStores(allStores); 
        } else {
            console.error('Esperado um array de lojas, mas a resposta foi:', result);
        }
    } catch (error) {
        console.error('Erro ao buscar lojas:', error);
    }
}

// Função para renderizar a tabela com as stores fornecidas
function renderTabelaStores(stores) {
    const tableBody = document.querySelector('tbody'); 

    tableBody.innerHTML = '';

    stores.forEach(store => {
        const row = document.createElement('tr');
        row.setAttribute('data-store-id', store.store_id);

        const storeIdCell = document.createElement('td');
        storeIdCell.textContent = store.store_id || 'ID não disponível';

        const storeNameCell = document.createElement('td');
        storeNameCell.textContent = store.store_name || 'Nome não disponível';

        const enderecoCell = document.createElement('td');
        enderecoCell.textContent = store.street || 'Endereço não disponível';

        const cepCell = document.createElement('td');
        cepCell.textContent = store.cep || 'CEP não disponível';

        // Célula de Ações
        const acoesCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.classList.add('btn-tabela__editar');
        const editLink = document.createElement('a');
        editLink.href = `./store-edit?id=${store.store_id}`;
        editLink.textContent = 'Editar';
        editButton.appendChild(editLink);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-tabela__deletar');
        deleteButton.setAttribute('data-store-id', store.store_id);
        const deleteImg = document.createElement('img');
        deleteImg.src = '../../img/icone_lixeira.png';
        deleteImg.alt = 'icone de lixeira';
        deleteImg.width = 15;
        deleteImg.height = 15;
        deleteButton.appendChild(deleteImg);

        acoesCell.appendChild(editButton);
        acoesCell.appendChild(deleteButton);

        row.appendChild(storeIdCell);
        row.appendChild(storeNameCell);
        row.appendChild(enderecoCell);
        row.appendChild(cepCell);
        row.appendChild(acoesCell);

        tableBody.appendChild(row);
    });
}


// Evento de busca na tabela
document.getElementById('campo__buscar-id').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase(); 

    const filteredStores = allStores.filter(store => {
        return store.store_id.toLowerCase().includes(searchValue);
    });

    renderTabelaStores(filteredStores); 
});


document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada, chamando a função getUsers");
    getStores();
});

//Deleção de Loja

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody');
    const modal = document.getElementById('deleteModal');
    const closeModal = document.querySelector('.modal-close');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    
    let currentStoreId = null;

    tableBody.addEventListener('click', function(event) {
        if (event.target.closest('.btn-tabela__deletar')) {
            const deleteButton = event.target.closest('.btn-tabela__deletar');
            currentStoreId = deleteButton.getAttribute('data-store-id'); 
            modal.style.display = 'flex'; 
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        currentStoreId = null;
    });

    cancelDeleteButton.addEventListener('click', () => {
        modal.style.display = 'none';
        currentStoreId = null;
    });

    confirmDeleteButton.addEventListener('click', () => {
        const rowToHide = document.querySelector(`tr[data-store-id="${currentStoreId}"]`);
        if (rowToHide) {
            rowToHide.classList.add('hidden-row'); 
        }
        modal.style.display = 'none'; 
        currentStoreId = null; 
    });
});

document.getElementById('campo__buscar-id').addEventListener('input', (event) => {
    const searchValue = event.target.value.trim().toLowerCase(); 

    const filteredStores = allStores.filter(store => {
        return (
            (store.store_id && store.store_id.toString().includes(searchValue)) ||
            (store.store_name && store.store_name.toLowerCase().includes(searchValue)) ||
            (store.street && store.street.toLowerCase().includes(searchValue)) ||
            (store.cep && store.cep.includes(searchValue))
        );
    });

    renderTabelaStores(filteredStores);
});
