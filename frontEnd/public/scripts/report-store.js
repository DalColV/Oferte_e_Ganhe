document.addEventListener("click", async (event) => {
    const exportCsvBtn = event.target.closest("#exportar");
    if (exportCsvBtn) {
        // Usando SweetAlert2 para capturar o store_id
        const { value: storeId } = await Swal.fire({
            title: 'Digite o código da loja',
            input: 'text',
            inputPlaceholder: 'Digite o código da loja',
            showCancelButton: true,
            background: '#f1f8f6',
            cancelButtonColor: '#f44336',
            confirmButtonText: 'Exportar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'Você deve digitar um código de loja!';
                }
            },
            customClass: {
                container: 'my-swal-container',  
                popup: 'my-swal-popup',          
                title: 'my-swal-title',          
                input: 'my-swal-input',          
                confirmButton: 'my-swal-confirm-button', 
                cancelButton: 'my-swal-cancel-button'
            }
        });

        if (!storeId) {
            console.error("Nenhum ID de loja fornecido.");
            return;
        }

        try {
            console.log("Enviando requisição para exportar relatório com store_id:", storeId);

            const response = await fetch('/stores-report-csv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ store_id: storeId })
            });

            if (!response.ok) throw new Error("Erro ao exportar CSV.");

            console.log("Requisição bem-sucedida, iniciando download do arquivo...");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `loja_${storeId}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            console.error('Erro ao exportar CSV:', error);
        }
    }
});
