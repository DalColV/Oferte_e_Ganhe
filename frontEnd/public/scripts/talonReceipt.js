let allReceiving = [];

function getStoreIdFromSession() {
    const sessionData = JSON.parse(sessionStorage.getItem('user')); 
    return sessionData && sessionData.user ? sessionData.user.store_id : null; 
}

async function fetchInventory(is_matriz, store_id) {
    try {
        let endpoint;
        
        if (is_matriz) {
            // Se for matriz, buscar todos os registros da tabela talon_logs
            endpoint = '/talon-logs';
        } else {
            // Se não for matriz, buscar o inventory_id correspondente ao store_id
            const inventoryResponse = await fetch(`/inventory?store_id=${store_id}`, { method: 'GET', credentials: 'include' });
            if (!inventoryResponse.ok) throw new Error('Erro ao buscar o inventory_id');
            const inventoryData = await inventoryResponse.json();
            const inventoryId = inventoryData && inventoryData.length > 0 ? inventoryData[0].inventory_id : null;

            if (!inventoryId) throw new Error('Inventory ID não encontrado');

            // Buscar os registros de talão correspondentes ao inventory_id encontrado
            endpoint = `/talon-logs/${inventoryId}`;
        }

        const response = await fetch(endpoint, { method: 'GET', credentials: 'include' });
        if (!response.ok) throw new Error('Erro ao buscar os dados do inventário');
        const data = await response.json();

        if (data && data.data) {
            const inventoryData = Array.isArray(data.data) ? data.data : [data.data];
            allInventories = inventoryData;  
            renderTable(allInventories);  
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do inventário:', error);
    }
}

function renderTable(data) {
    const tbody = document.querySelector('.tabela-taloes tbody');
    tbody.innerHTML = ''; // Limpar o conteúdo da tabela antes de injetar novos dados

    data.forEach(item => {
        const tr = document.createElement('tr');

        tr.classList.add(item.talon_status.toLowerCase()); // Adiciona a classe com base no status do talão

        // Criando as células da tabela
      
        const shipmentCell = document.createElement('td');
        shipmentCell.textContent = item.shiptment;

        const talonQuantityCell = document.createElement('td');
        talonQuantityCell.textContent = item.talon_quantity;

        const orderDateCell = document.createElement('td');
        orderDateCell.textContent = item.order_date;

        const sendDateCell = document.createElement('td');
        sendDateCell.textContent = item.send_date;

        const statusCell = document.createElement('td');
        statusCell.textContent = item.talon_status;
        statusCell.classList.add(item.talon_status.toLowerCase()); // Aplica a classe de status

        const acoesCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.classList.add('btn-tabela__editar');
        const editLink = document.createElement('a');
        editLink.href = `./view-edit-receipt-talon.html?id=${item.talon_id}`; // Passa o talon_id como parâmetro
        editLink.textContent = 'Editar';
        editButton.appendChild(editLink);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-tabela__deletar');
        const deleteImg = document.createElement('img');
        deleteImg.src = '../img/icone_lixeira.png';
        deleteImg.alt = 'icone de lixeira';
        deleteImg.width = 15;
        deleteImg.height = 15;
        deleteButton.appendChild(deleteImg);

        acoesCell.appendChild(editButton);
        acoesCell.appendChild(deleteButton);

        // Adicionando as células à linha
        tr.appendChild(shipmentCell);
        tr.appendChild(talonQuantityCell);
        tr.appendChild(orderDateCell);
        tr.appendChild(sendDateCell);
        tr.appendChild(statusCell);
        tr.appendChild(acoesCell);

        // Adiciona a linha à tabela
        tbody.appendChild(tr);
    });
}
