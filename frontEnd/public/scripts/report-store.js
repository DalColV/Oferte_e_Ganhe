document.addEventListener("click", async (event) => {
    const exportCsvBtn = event.target.closest("#exportar");
    if(exportCsvBtn){
        try{
            const response = await fetch('/stores-report-csv', { method: 'GET' });
            if (!response.ok) throw new Error("Erro ao exportar CSV.");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'lojas.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        }catch(error){
            console.error('Erro ao exportar CSV:', error);
        }
    }
});