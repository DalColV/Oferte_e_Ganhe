async function carregarPerfil() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const perfilId = urlParams.get('id');

        if (!perfilId) {
            console.error('ID do perfil não encontrado na URL');
            return;
        }

        const response = await fetch(`/profiles/${perfilId}`);

        if (!response.ok) {
            console.error('Erro ao buscar perfil:', response.status, response.statusText);
            throw new Error(`Erro ao buscar perfil: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json(); // Obter a resposta como JSON
        console.log('Dados da API:', result);

        const perfil = result.data; // Acessa a propriedade 'data' no resultado

        // Preencher o formulário com os dados do perfil
        document.querySelector('input[name="perfil"]').value = perfil.profile_name;

        document.querySelector('input[name="gestao-usuario"]').checked = perfil.has_user_management;
        document.querySelector('input[name="gestao-perfis"]').checked = perfil.has_profile_management;
        document.querySelector('input[name="gestao-estoque"]').checked = perfil.has_inventory_management;
        document.querySelector('input[name="envio-taloes"]').checked = perfil.has_shipping;
        document.querySelector('input[name="recimento-taloes"]').checked = perfil.has_receiving;
        document.querySelector('input[name="gestao-lojas"]').checked = perfil.has_store_management;
        document.querySelector('input[name="manutencao"]').checked = perfil.has_maintenance;
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        alert('Erro ao carregar os dados do perfil. Verifique a console para mais detalhes.');
    }
}



// Função para salvar as alterações do perfil
async function salvarPerfil() {
    try {
        // Obter o ID do perfil da URL
        const urlParams = new URLSearchParams(window.location.search);
        const perfilId = urlParams.get('id');

        if (!perfilId) {
            console.error('ID do perfil não encontrado na URL');
            return;
        }

        // Capturar os valores do formulário
        const profileData = {
            profile_name: document.querySelector('input[name="perfil"]').value,
            has_user_management: document.querySelector('input[name="gestao-usuario"]').checked,
            has_profile_management: document.querySelector('input[name="gestao-perfis"]').checked,
            has_inventory_management: document.querySelector('input[name="gestao-estoque"]').checked,
            has_shipping: document.querySelector('input[name="envio-taloes"]').checked,
            has_receiving: document.querySelector('input[name="recimento-taloes"]').checked,
            has_store_management: document.querySelector('input[name="gestao-lojas"]').checked,
            has_maintenance: document.querySelector('input[name="manutencao"]').checked,
        };

        // Fazer a requisição para atualizar os dados do perfil
        const response = await fetch(`/profile-edit/${perfilId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Perfil atualizado com sucesso!');
            window.location.href = '/profile-management';
        } else {
            console.error('Erro ao atualizar perfil:', result.message);
            alert('Erro ao atualizar o perfil.');
        }
    } catch (error) {
        console.error('Erro ao salvar perfil:', error);
    }
}

// Função para voltar à página anterior
function voltarPagina() {
    window.location.href = '/profile-management';
}
window.voltarPagina = voltarPagina;

// Adicionar eventos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarPerfil();

    document.querySelector('.btn__salvar').addEventListener('click', salvarPerfil);
});
