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
    const deleteButtons = document.querySelectorAll('lixeira');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const usuarioId = event.target.getAttribute('data-id'); // Obtém o ID do usuário a partir do atributo 'data-id'
            if (usuarioId) {
                const confirmDelete = confirm('Tem certeza que deseja excluir este usuário?');
                if (confirmDelete) {
                    try {
                        const response = await fetch(`/users/${usuarioId}`, {
                            method: 'DELETE',
                        });

                        if (!response.ok) {
                            throw new Error('Erro ao excluir usuário');
                        }

                        alert('Usuário excluído com sucesso!');
                        // Redirecionar ou atualizar a página após a exclusão
                        window.location.reload(); // Recarrega a página para refletir a exclusão
                    } catch (error) {
                        console.error('Erro ao excluir usuário:', error);
                        alert('Erro ao excluir o usuário. Tente novamente mais tarde.');
                    }
                }
            }
        });
    });
});
