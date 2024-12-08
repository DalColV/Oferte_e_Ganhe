// Função separada para atualizar o estoque
async function updateStock(talonId) {
    try {
        const response = await fetch(`/update-current-quantity/${talonId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ talon_quantity: 1 }) // Ajuste conforme necessário
        });

        const data = await response.json();
        console.log("Resposta da API de estoque:", data);

        if (data.message === "Current quantity updated successfully") {
            alert('Estoque atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar estoque.');
        }
    } catch (error) {
        console.error('Erro ao enviar dados de estoque:', error);
        alert('Erro interno ao atualizar estoque!');
    }
}

document.getElementById('form-editar-recebimento').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let idRecebimento = new URLSearchParams(window.location.search).get('id');  
    if (!idRecebimento) {
        const pathArray = window.location.pathname.split('/');
        idRecebimento = pathArray[pathArray.length - 1]; 
    }

    console.log("ID do recebimento:", idRecebimento);

    let status = document.getElementById('status').value; // Capturar status
    const recebimento = document.getElementById('recebimento').value; 
    const recebidoPor = document.getElementById('recebido').value;

    console.log("Dados do formulário:", { status, recebimento, recebidoPor });

    const formattedRecebimento = new Date(recebimento).toISOString(); 

    const dados = {
        talon_status: status, 
        receive_date: formattedRecebimento, 
        registration: recebidoPor
    };

    if (!idRecebimento) {
        alert('Erro: ID não encontrado na URL!');
        return;
    }

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

            // Verificar se o status é "recebido"
            if (status.toLowerCase() === 'recebido') {
                console.log("Chamando função de atualização de estoque...");
                updateStock(idRecebimento);
            }

            window.location.href = '/talon-receipt';  
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar os dados.');
    });
});
