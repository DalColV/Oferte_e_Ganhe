console.log("Arquivo JavaScript carregado com sucesso!");

let allUsers = [];

// Função para buscar os usuários do sistema
async function getUsers() {
    try {
        const response = await fetch('/users'); 
        const result = await response.json(); 

        console.log('Resposta da API de Usuários:', result); 

        if (Array.isArray(result.data)) {
            allUsers = result.data; 
            renderTabelaUsuarios(allUsers); 
        } else {
            console.error('Esperado um array de usuários, mas a resposta foi:', result);
        }
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
}

// Função para renderizar a tabela com os usuários fornecidos
function renderTabelaUsuarios(users) {
    const tableBody = document.querySelector('tbody'); // Referência ao corpo da tabela

    // Limpa o conteúdo da tabela antes de adicionar as novas linhas
    tableBody.innerHTML = '';

    // Adiciona uma linha para cada usuário
    users.forEach(user => {
        const row = document.createElement('tr');

        // Colunas da tabela
        const nomeCell = document.createElement('td');
        nomeCell.textContent = user.username || 'Nome não disponível';

        const matriculaCell = document.createElement('td');
        matriculaCell.textContent = user.registration || 'N/A';

        const lojaCell = document.createElement('td');
        lojaCell.textContent = user.store_id || 'N/A';

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email || 'E-mail não disponível';

        const acessoCell = document.createElement('td');
        acessoCell.textContent = user.profile_id || 'N/A';

        // Célula de ações
        const acoesCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.classList.add('btn-tabela__editar');
        const editLink = document.createElement('a');
        editLink.href = `./user-edit?id=${user.registration}`;
        editLink.textContent = 'Editar';
        editButton.appendChild(editLink);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-tabela__deletar');
        deleteButton.setAttribute('data-user-id', user.registration); // Atribuindo o data-user-id
        console.log('Criando botão de deletar para o usuário com ID:', user.registration); // Verifique os IDs
        const deleteImg = document.createElement('img');
        deleteImg.src = '../../img/icone_lixeira.png';
        deleteImg.alt = 'icone de lixeira';
        deleteImg.width = 15;
        deleteImg.height = 15;
        deleteButton.appendChild(deleteImg);

        acoesCell.appendChild(editButton);
        acoesCell.appendChild(deleteButton);

        // Adiciona as células na linha
        row.appendChild(nomeCell);
        row.appendChild(matriculaCell);
        row.appendChild(lojaCell);
        row.appendChild(emailCell);
        row.appendChild(acessoCell);
        row.appendChild(acoesCell);

        // Adiciona a linha no corpo da tabela
        tableBody.appendChild(row);
    });
}

// Evento de busca na tabela
document.getElementById('search-user').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase(); 

    const filteredUsers = allUsers.filter(user => {
        // Verifica se a matrícula do usuário contém o valor digitado
        return user.registration.toLowerCase().includes(searchValue);
    });

    renderTabelaUsuarios(filteredUsers); 
});


// Inicializa a página carregando os usuários
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada, chamando a função getUsers");
    getUsers();
});

// DELETAR USUARIO

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody'); // Referência ao corpo da tabela
    const modal = document.getElementById('deleteModal');
    const closeModal = document.querySelector('.modal-close');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    
    let currentUserId = null; // Variável para armazenar o ID do usuário que está sendo deletado

    // Abrir o modal ao clicar no botão de deletar
    tableBody.addEventListener('click', function(event) {
        if (event.target.closest('.btn-tabela__deletar')) {
            const deleteButton = event.target.closest('.btn-tabela__deletar'); // Encontra o botão de deletar
            currentUserId = deleteButton.getAttribute('data-user-id'); // Obtém o ID do usuário
            console.log("ID do usuário a ser deletado:", currentUserId); // Verifique se o ID está correto

            // Exibe o modal
            modal.style.display = 'flex'; 
        }
    });

    // Fechar o modal (caso o usuário queira cancelar a ação)
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none'; // Fecha o modal
        currentUserId = null; // Limpa o ID armazenado
    });

    cancelDeleteButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Fecha o modal sem deletar
        currentUserId = null; // Limpa o ID armazenado
    });

    confirmDeleteButton.addEventListener('click', () => {

        fetch(`/user-delete/${currentUserId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da API:', data); 
            if (data.message && data.message.includes("successfully")) {
                const rowToDelete = document.querySelector(`tr[data-user-id="${currentUserId}"]`);
                location.reload(); 
                if (rowToDelete) {
                    rowToDelete.remove(); 
                }
            } else {
                alert("Erro ao deletar o usuário: " + data.message);
            }
            modal.style.display = 'none'; 
            currentUserId = null; 
        })
        .catch(error => {
            alert("Ocorreu um erro ao deletar o usuário.");
            console.error(error);
            modal.style.display = 'none'; 
            currentUserId = null; 
        });
    });
});


