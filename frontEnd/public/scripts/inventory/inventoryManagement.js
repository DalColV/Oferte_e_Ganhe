let allInventories = [];

function getStoreIdFromSession() {
    const sessionData = JSON.parse(sessionStorage.getItem('user')); 
    return sessionData && sessionData.user ? sessionData.user.store_id : null; 
}

function toggleCreate(isMatriz, elementIds) {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = isMatriz ? 'none' : 'block';
        }
    });
}


function toggleTaloesCard(isMatriz) {
    const taloesCard = document.getElementById('card_alerta');
    if (taloesCard) {
        taloesCard.style.display = isMatriz ? 'block' : 'none';
    }
}


async function fetchInventory(is_matriz, store_id) {
    try {
        const endpoint = is_matriz ? '/inventory' : `/inventory/${store_id}`;
        const response = await fetch(endpoint, { method: 'GET', credentials: 'include' });
        if (!response.ok) throw new Error('Erro ao buscar os dados do inventário');
        const data = await response.json();
        toggleCreate(!is_matriz, ['criarEstoque', 'img-cruz-estoque', 'exportar']);
        if (data && data.data) {
            const inventoryData = Array.isArray(data.data) ? data.data : [data.data];
            allInventories = inventoryData;  
            renderTable(allInventories);  
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do inventário:', error);
    }
}
function renderTable(inventoryData) {
    const tableBody = document.querySelector('table tbody');
    const taloesCard = document.querySelector('#taloes-card'); 
    if (!tableBody || !taloesCard) return;

    tableBody.innerHTML = '';

    const storeIdsWithLowStock = []; 

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

        if (status === "Baixo") {
            if (!storeIdsWithLowStock.includes(item.store_id)) {
                storeIdsWithLowStock.push(item.store_id);
            }
        }
    });

    taloesCard.innerHTML = storeIdsWithLowStock.length > 0
        ? `Lojas: ${storeIdsWithLowStock.map(id => `<span class="store-id">${id}</span>`).join(' - ')}`
        : 'Lojas:';
}



document.addEventListener('DOMContentLoaded', async () => {
    const storeId = getStoreIdFromSession();
    if (!storeId) return;
    const stores = await fetch('/stores', { method: 'GET', credentials: 'include' });
    const storesData = await stores.json();
    const store = storesData.data.find(store => store.store_id === storeId);
    const isMatriz = store && store.is_matriz;
    toggleTaloesCard(isMatriz);
    await fetchInventory(isMatriz, storeId);
});


document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody');
    const modal = document.getElementById('deleteModal');
    const closeModal = document.querySelector('.modal-close');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    let currentInventoryId = null;
    tableBody.addEventListener('click', function(event) {
        if (event.target.closest('.btn-tabela__deletar')) {
            const deleteButton = event.target.closest('.btn-tabela__deletar');
            currentInventoryId = deleteButton.getAttribute('data-inventory-id');
            modal.style.display = 'flex';
        }
    });
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        currentInventoryId = null;
    });
    cancelDeleteButton.addEventListener('click', () => {
        modal.style.display = 'none';
        currentInventoryId = null;
    });
    confirmDeleteButton.addEventListener('click', () => {
        fetch(`/inventory-delete/${currentInventoryId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message && data.message.includes("successfully")) {
                const rowToDelete = document.querySelector(`tr[data-inventory-id="${currentInventoryId}"]`);
                if (rowToDelete) rowToDelete.remove();
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

document.getElementById('campo__buscar-id').addEventListener('input', (event) => {
    const searchValue = event.target.value.trim().toLowerCase();
    const filteredInventories = allInventories.filter(inventory => {
        return (
            (inventory.inventory_id && inventory.inventory_id.toString().toLowerCase().includes(searchValue)) ||
            (inventory.store_id && inventory.store_id.toString().toLowerCase().includes(searchValue))
        );
    });
    renderTable(filteredInventories);
});
