document.addEventListener("click", async (event) => {
    const exportCsvBtn = event.target.closest("#exportar");
    if (exportCsvBtn) {
        const storeId = prompt("Digite o Cógido da loja que deseja exportar o relatório:");
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
