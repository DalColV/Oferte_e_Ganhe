document.getElementById('form-editar-recebimento').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    
    // Pega o ID do recebimento da URL
    let idRecebimento = new URLSearchParams(window.location.search).get('id');  // Caso o ID esteja na query string
    if (!idRecebimento) {
        // Se o ID não for encontrado na query string, tenta pegar da URL diretamente
        const pathArray = window.location.pathname.split('/');
        idRecebimento = pathArray[pathArray.length - 1]; // Exemplo: /editar-recebimento/123
    }

    console.log("ID do recebimento:", idRecebimento);

    // Pega os dados inseridos no formulário
    let status = document.getElementById('status').value;
    const statusCapitalizado = status.charAt(0).toUpperCase() + status.slice(1);
    const recebimento = document.getElementById('recebimento').value; // Data em formato YYYY-MM-DDTHH:MM
    const recebidoPor = document.getElementById('recebido').value;

    console.log("Dados do formulário:", { status, recebimento, recebidoPor });

    // Verifica se a data de recebimento está no formato correto
    // Converte a data de recebimento para garantir que está no formato correto (ISO 8601)
    const formattedRecebimento = new Date(recebimento).toISOString(); // Isso garantirá que a data esteja no formato correto

    // Objeto com os dados a serem enviados para a API
    const dados = {
        talon_status: status, // Certifique-se de que o campo de status está correto
        receive_date: formattedRecebimento, // Data formatada para o padrão ISO
        registration: recebidoPor
    };

    // Verifica se o ID foi encontrado
    if (!idRecebimento) {
        alert('Erro: ID não encontrado na URL!');
        return;
    }

    // Envia a requisição PUT para a API
    fetch(`/talon-edit/${idRecebimento}`, {
        method: 'PUT',  
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Resposta da API:", data);
        if (data.message === "Talon Updated Successfully!") {
            alert('Recebimento editado com sucesso!');
            window.location.href = '/talon-receipt';  // Redireciona após sucesso
        } else {
            alert('Erro ao editar o recebimento!');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar os dados.');
    });
});
