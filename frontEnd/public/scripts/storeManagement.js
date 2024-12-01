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
// Função para renderizar a tabela com as stores fornecidas
function renderTabelaStores(stores) {
    const tableBody = document.querySelector('tbody'); // Referência ao corpo da tabela

    // Limpa o conteúdo da tabela antes de adicionar as novas linhas
    tableBody.innerHTML = '';

    // Adiciona uma linha para cada store
    stores.forEach(store => {
        const row = document.createElement('tr');

        // Colunas da tabela
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
        // Verifica se a matrícula do usuário contém o valor digitado
        return store.store_id.toLowerCase().includes(searchValue);
    });

    renderTabelaStores(filteredStores); 
});


// Inicializa a página carregando os usuários
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada, chamando a função getUsers");
    getStores();
});