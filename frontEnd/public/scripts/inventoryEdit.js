document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('.formulario-editar');
    const inventoryId = new URLSearchParams(window.location.search).get('id'); // Obtém o ID do estoque da URL

    if (!inventoryId) {
        alert('ID do estoque não encontrado!');
        return;
    }

    // Função para preencher os dados do formulário
    async function loadInventoryData() {
        try {
            const response = await fetch(`/inventory/${inventoryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                const inventory = result.data;

                form.querySelector('[name="loja"]').value = inventory.store_id || '';
                form.querySelector('[name="qtd-recomendada"]').value = inventory.recommended_quantity || '';
                form.querySelector('[name="qtd-minima"]').value = inventory.min_quantity || '';
                form.querySelector('[name="qtd-atual"]').value = inventory.current_quantity || '';
            } else {
                const error = await response.json();
                alert(`Erro ao buscar os dados do estoque: ${error.message}`);
            }
        } catch (err) {
            console.error('Erro ao buscar os dados do estoque:', err);
            alert('Erro ao carregar os dados do estoque. Verifique o console para mais detalhes.');
        }
    }

    await loadInventoryData();

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const store_id = form.querySelector('[name="loja"]').value.trim();
        const recommended_quantity = form.querySelector('[name="qtd-recomendada"]').value.trim();
        const min_quantity = form.querySelector('[name="qtd-minima"]').value.trim();
        const current_quantity = form.querySelector('[name="qtd-atual"]').value.trim();

        const inventoryData = {
            store_id,
            recommended_quantity: parseInt(recommended_quantity, 10),
            min_quantity: parseInt(min_quantity, 10),
            current_quantity: parseInt(current_quantity, 10)
        };

        try {
            const response = await fetch(`/inventory-edit/${inventoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inventoryData) 
            });

            if (response.ok) {
                const result = await response.json();
                window.location.href = '/inventory-management'; 
            } else {
                const error = await response.json();
            }
        } catch (err) {
            console.error('Erro ao atualizar o estoque:', err);
        }
    });
});
