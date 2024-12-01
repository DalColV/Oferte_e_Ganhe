// Função para carregar os dados do usuário no formulário
async function carregarUsuario() {
    try {
        // Obtém o ID do usuário da URL
        const urlParams = new URLSearchParams(window.location.search);
        const usuarioId = urlParams.get('id');

        if (!usuarioId) {
            console.error('ID do usuário não encontrado na URL');
            return;
        }

        // Faz a requisição para buscar os dados do usuário
        const response = await fetch(`/users/${usuarioId}`);
        if (!response.ok) {
            console.error('Erro ao buscar usuário:', response.status, response.statusText);
            throw new Error(`Erro ao buscar usuário: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        const usuario = result.data;

        // Preenche os campos do formulário com os dados do usuário
        document.querySelector('input[name="nome"]').value = usuario.username;
        document.querySelector('input[name="matricula"]').value = usuario.registration;
        document.querySelector('input[name="email"]').value = usuario.email || '';
        document.querySelector('select[name="acesso"]').value = usuario.profile_id || '';

        // Seleciona a loja correta (deve ser chamada após o carregamento das lojas)
        const storeSelect = document.querySelector('select[name="loja"]');
        if (storeSelect) {
            storeSelect.value = usuario.store_id || '';
        }
    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        alert('Erro ao carregar os dados do usuário. Verifique a console para mais detalhes.');
    }
}

// Função para carregar as lojas no select
async function carregarLojas() {
    try {
        const storeSelect = document.querySelector('select[name="loja"]');
        if (!storeSelect) {
            console.error("Elemento 'loja' não encontrado no DOM.");
            return;
        }

        const response = await fetch('http://localhost:3000/stores');
        if (!response.ok) throw new Error('Erro ao buscar lojas');

        const result = await response.json();
        const stores = result.data;

        stores.forEach((store) => {
            const option = document.createElement('option');
            option.value = store.store_id;
            option.textContent = store.store_name;
            storeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar lojas:', error);
        alert('Erro ao carregar as lojas. Tente novamente mais tarde.');
    }
}

// Função para carregar os perfis no select
async function carregarPerfis() {
    try {
        const accessSelect = document.querySelector('select[name="acesso"]');
        if (!accessSelect) {
            console.error("Elemento 'acesso' não encontrado no DOM.");
            return;
        }

        const response = await fetch('http://localhost:3000/profiles');
        if (!response.ok) throw new Error('Erro ao buscar perfis');

        const result = await response.json();
        const profiles = result.data;

        profiles.forEach((profile) => {
            const option = document.createElement('option');
            option.value = profile.profile_id;
            option.textContent = profile.profile_name;
            accessSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar perfis:', error);
        alert('Erro ao carregar os perfis. Tente novamente mais tarde.');
    }
}

// Função para salvar as alterações do usuário
async function salvarUsuario() {
    try {
        // Obtém o ID do usuário da URL
        const urlParams = new URLSearchParams(window.location.search);
        const usuarioId = urlParams.get('id');

        if (!usuarioId) {
            console.error('ID do usuário não encontrado na URL');
            return;
        }

        // Captura os valores do formulário
        const userData = {
            username: document.querySelector('input[name="nome"]').value,
            registration: document.querySelector('input[name="matricula"]').value,
            store_id: document.querySelector('select[name="loja"]').value,
            email: document.querySelector('input[name="email"]').value,
            profile_id: document.querySelector('select[name="acesso"]').value,
        };

        // Faz a requisição para atualizar os dados do usuário
        const response = await fetch(`/user-edit/${usuarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Usuário atualizado com sucesso!');
            window.location.href = '/user-management'; // Redireciona para a página de gestão de usuários
        } else {
            console.error('Erro ao atualizar usuário:', result.message);
            alert('Erro ao atualizar o usuário.');
        }
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
    }
}

// Função para voltar à página anterior
function voltarPagina() {
    window.location.href = '/user-management';
}
window.voltarPagina = voltarPagina;

// Adiciona eventos ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    await carregarLojas(); 
    await carregarUsuario();
    await carregarPerfis(); 
    document.querySelector('.btn__salvar').addEventListener('click', salvarUsuario);
});

