document.addEventListener('DOMContentLoaded', async () => {
    const storeSelect = document.getElementById('loja');
    const estoqueInput = document.getElementById('id_estoque'); // Campo oculto para id_estoque

    if (!storeSelect || !estoqueInput) {
        console.error("Elemento 'loja' ou 'id_estoque' não encontrado no DOM.");
        return;
    }

    // Carregar lojas no seletor
    try {
        console.log('Iniciando busca das lojas...');
        const response = await fetch('http://localhost:3000/stores');
        console.log('Resposta da API (lojas):', response);

        if (!response.ok) throw new Error('Erro ao buscar lojas');

        const result = await response.json();
        console.log('Dados recebidos (lojas):', result);

        const stores = result.data;
        stores.forEach((store) => {
            const option = document.createElement('option');
            option.value = store.store_id;
            option.textContent = store.store_id;
            storeSelect.appendChild(option);
        });

        console.log('Lojas carregadas com sucesso.');
    } catch (error) {
        console.error('Erro ao carregar lojas:', error);
        alert('Erro ao carregar lojas. Tente novamente mais tarde.');
    }

    // Buscar o id_estoque ao selecionar uma loja
    storeSelect.addEventListener('change', async (e) => {
        const storeId = e.target.value;
        console.log('Loja selecionada (store_id):', storeId);
    
        try {
            const response = await fetch(`/inventory/${storeId}`);
            if (!response.ok) throw new Error('Erro ao buscar estoque');
    
            const result = await response.json();
            console.log('Resposta da API (estoque):', result);
    
            if (result && result.data) {
                const estoqueId = result.data.inventory_id;  
                estoqueInput.value = estoqueId;
                console.log('Campo id_estoque preenchido com:', estoqueId);
            } else {
                console.error('Estoque não encontrado no retorno da API.');
            }
        } catch (error) {
            console.error('Erro ao buscar id_estoque:', error);
            alert('Erro ao buscar id_estoque.');
        }
    });
    
});

document.getElementById('cadastroTalaoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const dadosTalao = {
        registration: document.getElementById('matricula').value,
        store_id: document.getElementById('loja').value,
        talon_status: document.getElementById('status').value,
        shipment: document.getElementById('remessa').value,
        talon_quantity: document.getElementById('quantidade').value,
        send_date: document.getElementById('envio').value,
        order_date: document.getElementById('entrega').value,
        inventory_id: document.getElementById('id_estoque').value,
    };

    console.log('Dados do formulário enviados:', dadosTalao);

    try {
        const response = await fetch('http://localhost:3000/talon-new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosTalao),
        });

        console.log('Resposta da API (talon-new):', response);

        const result = await response.json();
        console.log('Dados recebidos (talon-new):', result);

        if (response.ok) {
            alert('Talão cadastrado com sucesso!');
            document.getElementById('cadastroTalaoForm').reset();
            window.location.href = '/talon-send';

        } else {
            alert('Erro: ' + result.message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao cadastrar talão.');
    }
});
