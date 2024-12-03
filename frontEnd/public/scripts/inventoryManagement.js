console.log("Script de inventário carregado!");

function getStoreIdFromSession() {
    const sessionData = JSON.parse(sessionStorage.getItem('user')); 
    console.log("Dados da sessão:", sessionData); 

    // Acessa o store_id dentro do objeto user
    return sessionData && sessionData.user ? sessionData.user.store_id : null; 
}

function toggleSolicitarTalaoButton(isMatriz) {
    const talaoButton = document.getElementById('solicitaTalao');
    if (talaoButton) {
        if (isMatriz) {
            talaoButton.style.display = 'none'; 
        } else {
            talaoButton.style.display = 'block'; 
        }
    } else {
        console.error("Botão de solicitar talões não encontrado.");
    }
}

function toggleTaloesCard(isMatriz) {
    const taloesCard = document.querySelector('.card__gestao-estoque-master');
    if (taloesCard) {
        if (!isMatriz) {
            taloesCard.style.display = 'none'; 
        } else {
            taloesCard.style.display = 'block'; 
        }
    } else {
        console.error("Card de solicitação de talões não encontrado.");
    }
}

async function fetchInventory(is_matriz, store_id) {
    try {
        console.log("Verificando store_id:", store_id);

        const endpoint = is_matriz ? '/inventory' : `/inventory/${store_id}`;
        console.log("Endpoint da API:", endpoint); 

        const response = await fetch(endpoint, {
            method: 'GET',
            credentials: 'include', 
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os dados do inventário');
        }

        const data = await response.json();
        console.log("Resposta da API: ", data); 

        toggleSolicitarTalaoButton(is_matriz);
        toggleTaloesCard(is_matriz);

        if (data && Array.isArray(data.data)) {
            renderTable(data.data); 
        } else {
            console.error("Dados de inventário inválidos ou não encontrados.");
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do inventário:', error);
    }
}

function renderTable(inventoryData) {
    console.log("Renderizando tabela com os dados:", inventoryData);
    const tableBody = document.querySelector('table tbody');
    if (!tableBody) {
        console.error("Elemento tbody não encontrado.");
        return;
    }

    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados

    inventoryData.forEach(item => {
        const status = item.current_quantity < item.recommended_quantity ? "Baixo" : "Normal";
        const statusClass = status === "Baixo" ? "gestao-estoque-baixo" : "gestao-estoque-normal";

        const row = document.createElement('tr');
        row.setAttribute('data-inventory-id', item.inventory_id);
        row.classList.add(statusClass);

        const storeIdCell = document.createElement('td');
        storeIdCell.textContent = item.store_id;

        const inventoryIdCell = document.createElement('td');
        inventoryIdCell.textContent = item.inventory_id;

        const statusCell = document.createElement('td');
        statusCell.textContent = status;

        const recommendedQuantityCell = document.createElement('td');
        recommendedQuantityCell.textContent = item.recommended_quantity;

        const currentQuantityCell = document.createElement('td');
        currentQuantityCell.textContent = item.current_quantity;

        const acoesCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.classList.add('btn-tabela__editar');
        const editLink = document.createElement('a');
        editLink.href = `./inventory-edit?id=${item.inventory_id}`; 
        editLink.textContent = 'Editar';
        editButton.appendChild(editLink);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-tabela__deletar');
        deleteButton.setAttribute('data-inventory-id', item.inventory_id); 
        console.log('Criando botão de deletar para o inventário com ID:', item.inventory_id);
        const deleteImg = document.createElement('img');
        deleteImg.src = '../../img/icone_lixeira.png';
        deleteImg.alt = 'icone de lixeira';
        deleteImg.width = 15;
        deleteImg.height = 15;
        deleteButton.appendChild(deleteImg);

        acoesCell.appendChild(editButton);
        acoesCell.appendChild(deleteButton);

        row.appendChild(inventoryIdCell);
        row.appendChild(storeIdCell);
        row.appendChild(statusCell);
        row.appendChild(recommendedQuantityCell);
        row.appendChild(currentQuantityCell);
        row.appendChild(acoesCell);

        tableBody.appendChild(row);
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    console.log("Página carregada!");

    const storeId = getStoreIdFromSession();
    console.log("Store ID da sessão:", storeId);

    if (!storeId) {
        console.error("Store ID não encontrado na sessão.");
        return;
    }

    const stores = await fetch('/stores', { method: 'GET', credentials: 'include' });
    const storesData = await stores.json();

    const store = storesData.data.find(store => store.store_id === storeId);
    const isMatriz = store && store.is_matriz;

    console.log("Verificando se é matriz:", isMatriz);

    await fetchInventory(isMatriz, storeId);
});

// DELEÇÃO DE ESTOQUE

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody');
    const modal = document.getElementById('deleteModal');
    const closeModal = document.querySelector('.modal-close');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    
    let currentInventoryId = null;

    // Evento para mostrar o modal de confirmação de exclusão
    tableBody.addEventListener('click', function(event) {
        if (event.target.closest('.btn-tabela__deletar')) {
            const deleteButton = event.target.closest('.btn-tabela__deletar');
            currentInventoryId = deleteButton.getAttribute('data-inventory-id');
            console.log("ID do estoque selecionado para exclusão:", currentInventoryId); 

            modal.style.display = 'flex';
        }
    });

    // Fechar o modal sem excluir
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        currentInventoryId = null;
    });

    // Cancelar exclusão
    cancelDeleteButton.addEventListener('click', () => {
        modal.style.display = 'none';
        currentInventoryId = null;
    });

    // Confirmar exclusão e fazer requisição para o backend
    confirmDeleteButton.addEventListener('click', () => {
        console.log('Confirmando exclusão do estoque com ID:', currentInventoryId); 

        // Fazer a requisição para o backend para excluir o estoque
        fetch(`/inventory-delete/${currentInventoryId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message && data.message.includes("successfully")) {
                const rowToDelete = document.querySelector(`tr[data-inventory-id="${currentInventoryId}"]`);
                if (rowToDelete) {
                    rowToDelete.remove();
                }
            } else {
                console.log("Erro ao excluir o estoque: ", data.message);
            }

            modal.style.display = 'none';
            currentInventoryId = null;
        })
        .catch(error => {
            console.error('Erro ao excluir o estoque:', error);
            modal.style.display = 'none';
            currentInventoryId = null;
        });
    });
});
