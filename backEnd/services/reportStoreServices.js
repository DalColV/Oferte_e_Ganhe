const { PythonShell } = require('python-shell');
const path = require('path');
const os = require('os');

const pythonExecutable = os.platform() === 'win32'
    ? path.join(__dirname, '../../.venv/Scripts/python.exe') 
    : path.join(__dirname, '../../.venv/bin/python');

PythonShell.defaultOptions = {
    pythonPath: pythonExecutable,
};

async function exportStoresReport(storeId) {
    if (!storeId || isNaN(storeId)) {
        return Promise.reject(new Error('storeId inválido.'));
    }

    const scriptPath = path.join(__dirname, '../reports/export_stores.py');

    console.log("Executando script Python em:", scriptPath);
    console.log("Passando store_id para o script:", storeId);

    return new Promise((resolve, reject) => {
        const pythonProcess = new PythonShell(scriptPath, {
            pythonOptions: ['-u'],
            args: [storeId], 
        });

        let stdout = [];
        let stderr = [];

        pythonProcess.on('message', (message) => {
            console.log(`stdout: ${message}`);
            stdout.push(message);
        });

        pythonProcess.on('stderr', (stderrMessage) => {
            console.error(`stderr: ${stderrMessage}`);
            stderr.push(stderrMessage);
        });

        pythonProcess.on('close', () => {
            console.log("Processo Python finalizado.");
        });

        pythonProcess.end((err, code, signal) => {
            if (err) {
                console.error(`Erro no processo Python: ${err.message}`);
                return reject(new Error(`Erro inesperado no processo Python: ${err.message}`));
            }

            const output = stdout.join('\n');
            if (code === 0 && output.includes("STATUS: SUCCESS")) {
                // Caminho do arquivo CSV exportado pelo Python
                const csvPath = path.join(__dirname, '../../relatorios/loja_' + storeId + '.csv');
                console.log("Arquivo CSV exportado com sucesso:", csvPath);
                resolve(csvPath);
            } else {
                console.error(`Erro no script Python: ${stderr.join('\n')}`);
                reject(new Error(`Erro ao exportar relatório: saída não reconhecida ou código de erro ${code}.`));
            }
        });
    });
}

module.exports = {
    exportStoresReport,
};
