// Função para consultar todos os usuários
async function getUsuarios() {
    try {
      const response = await fetch('/users'); 
      const result = await response.json(); 
    
      if (Array.isArray(result.data)) {
        document.getElementById('count1').textContent = result.data.length > 0 ? result.data.length : '00';
      } else {
        document.getElementById('count1').textContent = '00';
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error); 
      document.getElementById('count1').textContent = '00'; 
    }
  }
  
  // Função para consultar todos os perfis
  async function getPerfis() {
    try {
      const response = await fetch('/profiles'); 
      const result = await response.json(); 
  
  
      if (Array.isArray(result.data)) {
        document.getElementById('count2').textContent = result.data.length > 0 ? result.data.length : '00';
      } else {
        document.getElementById('count2').textContent = '00';
      }
    } catch (error) {
      document.getElementById('count2').textContent = '00'; 
    }
  }


// Função para consultar todos os talões e atualizar os status
async function getTaloes() {
    try {
        const response = await fetch('/talon-logs'); 
        const result = await response.json(); 

        if (Array.isArray(result.data)) {
            const enviados = result.data.filter(talao => talao.talon_status === 'enviado');
            const pendentes = result.data.filter(talao => talao.talon_status === 'extraviado');
            const recebidos = result.data.filter(talao => talao.talon_status === 'recebido');

            document.getElementById('Sent').textContent = enviados.length > 0 ? enviados.length : '00';
            document.getElementById('Misplaced').textContent = pendentes.length > 0 ? pendentes.length : '00';
            document.getElementById('Received').textContent = recebidos.length > 0 ? recebidos.length : '00';
        } else {
            document.getElementById('Sent').textContent = '00';
            document.getElementById('Misplaced').textContent = '00';
            document.getElementById('Received').textContent = '00';
        }
    } catch (error) {
        console.error('Erro ao buscar talões:', error);
        
        document.getElementById('Sent').textContent = '00';
        document.getElementById('Misplaced').textContent = '00';
        document.getElementById('Received').textContent = '00';
    }
}

  document.addEventListener('DOMContentLoaded', () => {
    getUsuarios();
    getPerfis();
    getTaloes();
  });
  