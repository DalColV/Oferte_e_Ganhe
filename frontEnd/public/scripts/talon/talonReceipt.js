let allTalon = [];
let talonIdToDelete = null;

// Função para obter o store_id da sessão
function getStoreIdFromSession() {
    const sessionData = JSON.parse(sessionStorage.getItem('user'));
    return sessionData && sessionData.user ? sessionData.user.store_id : null;
}

async function isMatriz(store_id) {
    try {
        if (!store_id) throw new Error('Store ID não encontrado na sessão');

        const response = await fetch(`/stores/${store_id}`, { method: 'GET', credentials: 'include' });

        if (!response.ok) throw new Error(`Erro ao verificar matriz: ${response.statusText}`);

        const result = await response.json();
        return result.data ? result.data.is_matriz : false;
    } catch (error) {
        console.error("Erro ao verificar se a loja é matriz:", error);
        return false;
    }
}

async function fetchInventory() {
    try {
        const store_id = getStoreIdFromSession();

        if (!store_id) throw new Error('Store ID não encontrado na sessão');

        // Verificando se a loja é matriz
        const isMatrizStore = await isMatriz(store_id);

         const endpoint = isMatrizStore ? `/talon-logs` : `/talon/${store_id}`;

        const response = await fetch(endpoint, { method: 'GET', credentials: 'include' });

        if (!response.ok) throw new Error(`Erro ao buscar os dados do inventário: ${response.statusText}`);

        const data = await response.json();

        allTalon = Array.isArray(data.data) ? data.data : [data.data];

        renderTable(allTalon);
    } catch (error) {
        console.error("Erro ao carregar os dados do inventário:", error);
    }
}

function renderTable(data) {
    const tbody = document.querySelector('.tabela-taloes tbody');
    if (!tbody) {
        console.warn("Tabela não encontrada no DOM");
        return;
    }

    tbody.innerHTML = '';

    if (!data || data.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 6;
        td.textContent = 'Nenhum dado encontrado.';
        td.classList.add('text-center');
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    data.forEach(item => {
        const tr = document.createElement('tr');
    
        const createCell = (text, className = '') => {
            const td = document.createElement('td');
            td.textContent = text;
            if (className) td.classList.add(className);
            return td;
        };
    
        tr.appendChild(createCell(item.store_id || 'N/A'));
        tr.appendChild(createCell(item.shipment || 'N/A'));

        const statusClass = (() => {
            if (!item.talon_status) return '';
            const statusLowerCase = item.talon_status.toLowerCase();
            if (statusLowerCase === 'extraviado') return 'status-extraviado';
            if (statusLowerCase === 'recebido') return 'status-recebido';
            if (statusLowerCase === 'enviado') return 'status-enviado';
            return '';
        })();
        tr.appendChild(createCell(item.talon_status || 'Indefinido', statusClass));

        tr.appendChild(createCell(item.talon_quantity || 'N/A'));
        tr.appendChild(createCell(item.send_date || 'N/A'));
        tr.appendChild(createCell(item.receive_date || 'N/A'));
        tr.appendChild(createCell(item.registration || 'N/A'));

        const actionsCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.classList.add('btn-tabela__editar');
        const editLink = document.createElement('a');
        editLink.href = `./talon-edit-receiving?id=${item.talon_id || ''}`;
        editLink.textContent = 'Editar';
        editButton.appendChild(editLink);

        if (item.talon_status && item.talon_status.toLowerCase() === 'recebido') {
            editButton.disabled = true;
            editButton.classList.add('disabled');
        }

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-tabela__deletar');
        deleteButton.setAttribute('data-talon-id', item.talon_id || '');

        const deleteImg = document.createElement('img');
        deleteImg.src = '../../img/icone_lixeira.png';
        deleteImg.alt = 'icone de lixeira';
        deleteImg.width = 15;
        deleteImg.height = 15;

        deleteButton.appendChild(deleteImg);
        deleteButton.addEventListener('click', (event) => {
            const talonIdToDelete = event.target.closest('button').getAttribute('data-talon-id');
            showDeleteModal(); 
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        tr.appendChild(actionsCell);

        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchInventory();
});
