let allTalon = [];

function getStoreIdFromSession() {
    const sessionData = JSON.parse(sessionStorage.getItem('user'));
    const storeId = sessionData && sessionData.user && sessionData.user.store_id ? sessionData.user.store_id : null;
    return storeId;
}
async function isMatriz(store_id) {

    try {
        if (!store_id) {
            throw new Error('Store ID não encontrado na sessão');
        }

        const response = await fetch(`/stores/${store_id}`, { method: 'GET', credentials: 'include' });

        if (!response.ok) {
            throw new Error(`Erro ao verificar matriz: ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.data || typeof result.data.is_matriz !== 'boolean') {
            throw new Error("Resposta inesperada: 'is_matriz' não é um booleano ou está ausente");
        }

        return result.data.is_matriz;
    } catch (error) {
        console.error("Erro ao verificar se a loja é matriz:", error);
        throw error; 
    }
}

async function fetchInventory() {
    try {
        const store_id = getStoreIdFromSession();
        if (!store_id) {
            throw new Error('Store ID não encontrado na sessão');
        }


        const isMatrizStore = await isMatriz(store_id); 

        const endpoint = isMatrizStore ? '/talon-logs' : `/inventory/${store_id}`; 

        const response = await fetch(endpoint, { method: 'GET', credentials: 'include' });

        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados do inventário: ${response.statusText}`);
        }

        const data = await response.json();
        const id_inventario = data.data.inventory_id;

        let allTalon = [];

        if (data.data && data.data.talon_id) {
            allTalon = [data.data]; 
        } else {
            //console.warn('Formato inesperado de dados do talon:', data);
        }

        if (id_inventario) {
            const talonLogsEndpoint = `/talon-logs/${id_inventario}`;

            const talonLogsResponse = await fetch(talonLogsEndpoint, { method: 'GET', credentials: 'include' });

            if (!talonLogsResponse.ok) {
                throw new Error(`Erro ao buscar os registros de talon: ${talonLogsResponse.statusText}`);
            }

            const talonLogsData = await talonLogsResponse.json();

            if (Array.isArray(talonLogsData.data)) {
                allTalon = talonLogsData.data;  
                console.log("Todos os dados de talon:", allTalon);
            } else if (talonLogsData.data) {
                allTalon = [talonLogsData.data];  
                console.log("Dado de talon único:", allTalon);
            } else {
                console.warn('Nenhum dado de talon encontrado:', talonLogsData);
            }
        }

        renderTable(allTalon);

    } catch (error) {
        console.error("Erro ao carregar os dados do inventário:", error);
    }
}



function renderTable(data) {

    const tbody = document.querySelector('.tabela-taloes tbody');
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
        const statusClass = item.talon_status?.toLowerCase() || 'status-indefinido';
        tr.classList.add(statusClass);

        const createCell = (text) => {
            const td = document.createElement('td');
            td.textContent = text;
            return td;
        };

        tr.appendChild(createCell(item.shipment || 'N/A'));
        tr.appendChild(createCell(item.talon_status || 'Indefinido'));
        tr.appendChild(createCell(item.talon_quantity || 'N/A'));
        tr.appendChild(createCell(item.order_date || 'N/A'));
        tr.appendChild(createCell(item.send_date || 'N/A'));

        const actionsCell = document.createElement('td');

        // Botão Editar
        const editButton = document.createElement('button');
        editButton.classList.add('btn-tabela__editar');
        const editLink = document.createElement('a');
        editLink.href = `./talon-edit?id=${item.talon_id || ''}`;
        editLink.textContent = 'Editar';
        editButton.appendChild(editLink);

        // // Botão Excluir
        // const deleteButton = document.createElement('button');
        // deleteButton.classList.add('btn-tabela__deletar');
        // deleteButton.setAttribute('data-talon-id', item.talon_id || ''); 
        // const deleteImg = document.createElement('img');
        // deleteImg.src = '../../img/icone_lixeira.png';
        // deleteImg.alt = 'Ícone de lixeira';
        // deleteImg.width = 15;
        // deleteImg.height = 15;
        // deleteButton.appendChild(deleteImg);

        actionsCell.appendChild(editButton);
        //actionsCell.appendChild(deleteButton);
        tr.appendChild(actionsCell);

        tbody.appendChild(tr);
    });
}

// Função para filtrar os dados da tabela
function filtrarTabela() {
    const buscaFiltro = document.getElementById('busca').value.toLowerCase();
  
    const dadosFiltrados = allTalon.filter(item => {
        const correspondeRemessa = item.shipment?.toLowerCase().includes(buscaFiltro);
        const correspondeStatus = item.talon_status?.toLowerCase().includes(buscaFiltro);
        return (correspondeRemessa || correspondeStatus || buscaFiltro === '');
    });
  
    renderTable(dadosFiltrados);  
}

document.addEventListener('DOMContentLoaded', () => {
    fetchInventory(); 
});

