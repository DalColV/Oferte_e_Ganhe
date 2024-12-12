let allProfiles = []; 

// Função para consultar os perfis e armazenar todos os dados
async function getPerfis() {
    try {
        const response = await fetch('/profiles'); 
        const result = await response.json(); 

        if (Array.isArray(result.data)) {
            allProfiles = result.data; 
            renderTabelaPerfis(allProfiles); 
        } else {
            console.error('Esperado um array de perfis, mas a resposta foi:', result);
        }
    } catch (error) {
        console.error('Erro ao buscar perfis:', error);
    }
}

// Função para renderizar a tabela com os perfis 
function renderTabelaPerfis(perfis) {
    const tableBody = document.getElementById('perfil-table-body');
    tableBody.innerHTML = '';

    perfis.forEach(perfil => {
        const row = document.createElement('tr');
        row.setAttribute('data-profile-id', perfil.profile_id);

        const idCell = document.createElement('td');
        idCell.textContent = perfil.profile_id || 'ID não disponível';

        const nomeCell = document.createElement('td');
        nomeCell.textContent = perfil.profile_name || 'Nome não disponível';

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

        const acoesCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.classList.add('btn-tabela__editar');
        const editLink = document.createElement('a');
        editLink.href = `./profile-edit?id=${perfil.profile_id}`;
        editLink.textContent = 'Editar';
        editButton.appendChild(editLink);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-tabela__deletar');
        deleteButton.setAttribute('data-profile-id', perfil.profile_id);
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
        row.appendChild(idCell);
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
    getPerfis();
});

// DELEÇÃO DE PERFIL

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody');
    const modal = document.getElementById('deleteModal');
    const closeModal = document.querySelector('.modal-close');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    
    let currentProfileId = null;

    tableBody.addEventListener('click', function(event) {
        if (event.target.closest('.btn-tabela__deletar')) {
            const deleteButton = event.target.closest('.btn-tabela__deletar');
            currentProfileId = deleteButton.getAttribute('data-profile-id');
            modal.style.display = 'flex';
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        currentProfileId = null;
    });

    cancelDeleteButton.addEventListener('click', () => {
        modal.style.display = 'none';
        currentProfileId = null;
    });

    confirmDeleteButton.addEventListener('click', () => {
        fetch(`/profile-delete/${currentProfileId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message && data.message.includes("successfully")) {
                const rowToDelete = document.querySelector(`tr[data-profile-id="${currentProfileId}"]`);
                if (rowToDelete) {
                    rowToDelete.remove();
                }
            } else {
                alert("Erro ao deletar o perfil: " + data.message);
            }
            modal.style.display = 'none';
            currentProfileId = null;
        })
        .catch(error => {
            alert("Ocorreu um erro ao deletar o perfil.");
            console.error(error);
            modal.style.display = 'none';
            currentProfileId = null;
        });
    });
});
