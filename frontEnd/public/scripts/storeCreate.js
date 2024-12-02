document.addEventListener('DOMContentLoaded', () => {
    const salvarButton = document.querySelector('.btn__salvar');

    salvarButton.addEventListener('click', async (event) => {
        event.preventDefault(); 

        // Seleciona os valores do formulário
        const codigoLoja = document.querySelector('input[name="codigo-loja"]').value.trim();
        const nome = document.querySelector('input[name="nome"]').value.trim();
        const cep = document.querySelector('input[name="CEP"]').value.trim();
        const rua = document.querySelector('input[name="rua"]').value.trim();
        const numero = document.querySelector('input[name="numero"]').value.trim();

        if (!codigoLoja || !nome || !cep || !rua || !numero) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novaLoja = {
            store_id: codigoLoja,
            store_name: nome,
            cep: cep,
            street: rua,
            number: numero,
        };

        try {
            const response = await fetch('/store-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaLoja),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Loja criada com sucesso!');
                // Limpa os campos do formulário
                document.querySelector('input[name="codigo-loja"]').value = '';
                document.querySelector('input[name="nome"]').value = '';
                document.querySelector('input[name="CEP"]').value = '';
                document.querySelector('input[name="rua"]').value = '';
                document.querySelector('input[name="numero"]').value = '';
            } else {
                alert('Erro ao criar loja: ' + (result.message || 'Tente novamente mais tarde.'));
            }
        } catch (error) {
            console.error('Erro ao criar loja:', error);
            alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    });
});
