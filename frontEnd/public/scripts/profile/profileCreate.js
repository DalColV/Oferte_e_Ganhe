document.addEventListener("DOMContentLoaded", () => {
  preencherFormularioCriacao();
  configurarEventos(); 
});

function preencherFormularioCriacao() {
  try {
      document.querySelector('input[name="perfil"]').value = ''; // Nome do perfil vazio

      document.querySelector('input[name="gestao-usuario"]').checked = false;
      document.querySelector('input[name="gestao-perfis"]').checked = false;
      document.querySelector('input[name="gestao-estoque"]').checked = false;
      document.querySelector('input[name="envio-taloes"]').checked = false;
      document.querySelector('input[name="recimento-taloes"]').checked = false;
      document.querySelector('input[name="gestao-lojas"]').checked = false;
      document.querySelector('input[name="manutencao"]').checked = false;
  } catch (error) {
      console.error('Erro ao preencher o formulário de criação de perfil:', error);
      alert('Erro ao preencher o formulário. Verifique o console para mais detalhes.');
  }
}

function configurarEventos() {
  const btnSalvar = document.querySelector('.btn__salvar');
  
  btnSalvar.addEventListener('click', async (event) => {
      event.preventDefault(); 

      const profile_name = document.querySelector('input[name="perfil"]').value;
      const has_user_management = document.querySelector('input[name="gestao-usuario"]').checked;
      const has_profile_management = document.querySelector('input[name="gestao-perfis"]').checked;
      const has_inventory_management = document.querySelector('input[name="gestao-estoque"]').checked;
      const has_shipping = document.querySelector('input[name="envio-taloes"]').checked;
      const has_receiving = document.querySelector('input[name="recimento-taloes"]').checked;
      const has_store_management = document.querySelector('input[name="gestao-lojas"]').checked;
      const has_maintenance = document.querySelector('input[name="manutencao"]').checked;

      if (!profile_name.trim()) {
          alert('O nome do perfil é obrigatório!');
          return;
      }

      try {
          const response = await fetch('http://localhost:3000/profile-new', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  profile_name,
                  has_user_management,
                  has_profile_management,
                  has_inventory_management,
                  has_shipping,
                  has_receiving,
                  has_store_management,
                  has_maintenance
              })
          });

          if (!response.ok) {
              throw new Error('Erro ao criar o perfil!');
          }

          const result = await response.json();

          alert('Perfil criado com sucesso!');
          window.location.href = '/profile-management'; 
      } catch (error) {
          console.error('Erro ao enviar os dados do perfil:', error);
          alert('Erro ao criar o perfil. Tente novamente mais tarde.');
      }
  });
}

function voltarPagina() {
    window.location.href = '/profile-management';
}
window.voltarPagina = voltarPagina;