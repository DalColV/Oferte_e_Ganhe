let allTalon = [];

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
        console.log("A loja é matriz?", isMatrizStore);

        const endpoint = isMatrizStore ? '/talon-logs' : `/talon/${store_id}`;
        console.log("Endpoint que será chamado:", endpoint);

        const response = await fetch(endpoint, { method: 'GET', credentials: 'include' });

        if (!response.ok) throw new Error(`Erro ao buscar os dados do inventário: ${response.statusText}`);

        const data = await response.json();

        allTalon = Array.isArray(data.data) ? data.data : [data.data];

        renderTable(allTalon);
    } catch (error) {
        console.error("Erro ao carregar os dados do inventário:", error);
    }
}

// Função para renderizar a tabela com os talões
function renderTable(data) {
    const tbody = document.querySelector('.tabela-taloes tbody');
    if (!tbody) return;

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
    
        // Adiciona células normalmente
        tr.appendChild(createCell(item.store_id || 'N/A'));
        tr.appendChild(createCell(item.shipment || 'N/A'));
    
        // Célula de status com lógica de cor
        const statusClass = (() => {
            if (!item.talon_status) return '';
            const statusLowerCase = item.talon_status.toLowerCase();
            if (statusLowerCase === 'extraviado') return 'status-extraviado';
            if (statusLowerCase === 'recebido') return 'status-recebido';
            if (statusLowerCase === 'enviado') return 'status-enviado';
            return '';
        })();
        tr.appendChild(createCell(item.talon_status || 'Indefinido', statusClass));
    
        // Adiciona as outras células
        tr.appendChild(createCell(item.talon_quantity || 'Indefinido'));
        tr.appendChild(createCell(item.send_date || 'N/A'));
        tr.appendChild(createCell(item.receive_date || 'N/A'));
        tr.appendChild(createCell(item.registration || 'N/A'));
    
        // Célula de ações
        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.classList.add('btn-tabela__editar');
        const editLink = document.createElement('a');
        editLink.href = `./talon-edit-receiving?id=${item.talon_id || ''}`;
        editLink.textContent = 'Editar';
        editButton.appendChild(editLink);
        actionsCell.appendChild(editButton);
    
        tr.appendChild(actionsCell);
        tbody.appendChild(tr);
    });
    
}

// Função de filtro para o campo de busca
document.getElementById('busca').addEventListener('input', (event) => {
    const searchValue = event.target.value.trim().toLowerCase();
    
    if (searchValue === '') {
        renderTable(allTalon); 
        return;
    }

    const filteredTalon = allTalon.filter(talon => {
        return (
            (talon.talon_id && talon.talon_id.toString().toLowerCase().includes(searchValue)) ||
            (talon.store_id && talon.store_id.toString().toLowerCase().includes(searchValue)) ||
            (talon.shipment && talon.shipment.toLowerCase().includes(searchValue)) ||
            (talon.talon_status && talon.talon_status.toLowerCase().includes(searchValue))
        );
    });

    renderTable(filteredTalon);
});

// Chamada para carregar os dados após o DOM ser carregado
document.addEventListener('DOMContentLoaded', () => {
    fetchInventory();
});
