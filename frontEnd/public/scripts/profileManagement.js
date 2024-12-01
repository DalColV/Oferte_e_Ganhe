let allProfiles = []; // Variável para armazenar os perfis retornados pela API

// Função para consultar os perfis e armazenar todos os dados
async function getPerfis() {
    try {
        const response = await fetch('/profiles'); // Rota para consultar todos os perfis
        const result = await response.json(); // Resposta da API

        console.log('Resposta da API de Perfis:', result); // Verifique a estrutura dos dados

        if (Array.isArray(result.data)) {
            allProfiles = result.data; // Armazena todos os perfis para o filtro
            renderTabelaPerfis(allProfiles); // Renderiza a tabela inicialmente com todos os perfis
        } else {
            console.error('Esperado um array de perfis, mas a resposta foi:', result);
        }
    } catch (error) {
        console.error('Erro ao buscar perfis:', error);
    }
}

// Função para renderizar a tabela com os perfis fornecidos
function renderTabelaPerfis(perfis) {
    const tableBody = document.getElementById('perfil-table-body'); // Referência ao corpo da tabela

    // Limpa o conteúdo da tabela antes de adicionar as novas linhas
    tableBody.innerHTML = '';

    // Adiciona uma linha para cada perfil
    perfis.forEach(perfil => {
        const row = document.createElement('tr');

        // Célula do nome do perfil
        const nomeCell = document.createElement('td');
        nomeCell.textContent = perfil.profile_name || 'Nome não disponível';

        // Célula de Acesso
        const acessoCell = document.createElement('td');
        const modulosAcessados = [];
        if (perfil.has_profile_management) modulosAcessados.push('Gestão Perfil');
        if (perfil.has_user_management) modulosAcessados.push('Gestão Usuário');
        if (perfil.has_inventory_management) modulosAcessados.push('Gestão Estoque');
        if (perfil.has_maintenance) modulosAcessados.push('Manutenção');
        if (perfil.has_store_management) modulosAcessados.push('Gestão de Loja');
        if (perfil.has_shipping) modulosAcessados.push('Envio');
        if (perfil.has_receiving) modulosAcessados.push('Recebimento');
        
        acessoCell.innerHTML = modulosAcessados.length > 0 
            ? modulosAcessados.map(modulo => `<div>${modulo}</div>`).join('') 
            : 'Nenhum';

        // Célula de Ações
        const acoesCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.classList.add('btn-tabela__editar');
        const editLink = document.createElement('a');
        editLink.href = `./profile-edit?id=${perfil.profile_id}`;
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

        row.appendChild(nomeCell);
        row.appendChild(acessoCell);
        row.appendChild(acoesCell);

        tableBody.appendChild(row);
    });
}

document.getElementById('search-profile').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase(); 
    const filteredProfiles = allProfiles.filter(perfil => 
        perfil.profile_name.toLowerCase().includes(searchValue) 
    );
    renderTabelaPerfis(filteredProfiles); 
});

document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada, chamando a função getPerfis");
    getPerfis();
});

