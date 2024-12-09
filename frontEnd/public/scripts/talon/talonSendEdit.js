document.addEventListener('DOMContentLoaded', async () => {
    const storeSelect = document.getElementById('loja'); 

    if (!storeSelect) {
        console.error("Elemento 'loja' não encontrado no DOM.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/stores');
        if (!response.ok) throw new Error('Error fetching stores');

        const result = await response.json();
        const stores = result.data; 
        stores.forEach((store) => {
            const option = document.createElement('option');
            option.value = store.store_id;
            option.textContent = store.store_id;
            storeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading stores:', error);
        alert('Error loading stores. Please try again later.');
    }
});

document.getElementById('form-editar-recebimento').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let idEnvio = new URLSearchParams(window.location.search).get('id');  
    if (!idEnvio) {
        const pathArray = window.location.pathname.split('/');
        idEnvio = pathArray[pathArray.length - 1]; 
    }

    console.log("ID do recebimento:", idEnvio);

    let loja = document.getElementById('loja').value; 
    let status = document.getElementById('status').value; 
    const remessa = document.getElementById('remessa').value; 
    const quantidade = document.getElementById('nTaloes').value;
    const dataEnvio = document.getElementById('envio').value;
    const dataEntrega = document.getElementById('entrega').value;



    const formattedEnvio = new Date(dataEnvio).toISOString(); 
    const formattedEntrega = new Date(dataEntrega).toISOString(); 



    const dados = {
        store_id: loja,
        talon_status: status, 
        shipment: remessa,
        talon_quantity: quantidade,
        send_date: formattedEnvio, 
        order_fate: formattedEntrega
    };

    if (!idEnvio) {
        alert('Erro: ID não encontrado na URL!');
        return;
    }

    fetch(`/talon-edit/${idEnvio}`, {
        method: 'PUT',  
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Talon Updated Successfully!") {
            alert('Envio editado com sucesso!');

            // Verificar se o status é "recebido"
            if (status.toLowerCase() === 'recebido') {
                updateStock(idEnvio);
            }

            window.location.href = '/talon-receipt';  
        }
    })
    .catch(error => {
        alert('Erro ao enviar os dados.');
    });
});
