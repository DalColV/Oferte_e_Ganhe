const talonService = require('../services/talonServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');
const reportService = require('../services/reportSendServices');
const reportReceiptService = require('../services/reportReceiptServices')
const reportSendServices = require('../services/reportSendServices')

class TalonController {
    // Criar um novo registro de Talon
    static async createTalon(req, res) {
        const { inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration, store_id } = req.body;
        try {
            if ( !shipment || !talon_quantity || !talon_status || !registration || !store_id) {
                throw new AppError("Required fields are missing!", 400);
            }

            const newTalon = await talonService.insertTalon({
                inventory_id,
                shipment,
                talon_quantity,
                send_date,
                order_date,
                talon_status,
                receive_date,
                registration,
                store_id,
                
            });

            sendSuccess(res, 201, "Talon Created Successfully!", newTalon);
        } catch (error) {
            handleError(res, error);
        }
    }

    // Consultar todos os registros de Talon
    static async consultAllTalons(req, res) {
        try {
            const talons = await talonService.talonConsultAll();
            sendSuccess(res, 200, "Talons retrieved successfully", talons);
        } catch (error) {
            handleError(res, error);
        }
    }

    // Consultar um registro de Talon por ID
    static async consultTalonById(req, res) {
        const { talon_id } = req.params;
        try {
            if (!talon_id) {
                throw new AppError("Talon ID is required!", 400);
            }

            const talon = await talonService.talonConsultById(talon_id);
            sendSuccess(res, 200, "Talon found", talon);
        } catch (error) {
            handleError(res, error);
        }
    }
    // Consultar um registro de Talon por Store
    static async consultTalonByStore(req, res) {
        const { store_id } = req.params;
        console.log('Store ID recebido:', store_id);

        try {
            if (!store_id) {
                throw new Error("Store ID is required!");
            }

            // Chama o serviço para buscar os talons
            const talons = await talonService.getTalonsByStore(store_id);
            sendSuccess(res, 200, "Talons found", talons);
        } catch (error) {
            handleError(res, error);
        }
    }


    // Atualizar um registro de Talon
    static async updateTalon(req, res) {
        const { talon_id } = req.params;
        const { inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration, store_id } = req.body;
        try {
            if (!talon_id) {
                throw new AppError("Talon ID is required!", 400);
            }

            const updatedTalon = await talonService.editTalon(talon_id, {
                inventory_id,
                shipment,
                talon_quantity,
                send_date,
                order_date,
                talon_status,
                receive_date,
                registration,
                store_id,
                
            });

            sendSuccess(res, 200, "Talon Updated Successfully!", updatedTalon);
        } catch (error) {
            handleError(res, error);
        }
    }

    // Deletar um registro de Talon
    static async deleteTalon(req, res) {
        const { talon_id } = req.params;
        try {
            if (!talon_id) {
                throw new AppError("Talon ID is required!", 400);
            }

            const deletedTalon = await talonService.deleteTalonLogs(talon_id);
            sendSuccess(res, 200, "Talon deleted successfully", deletedTalon);
        } catch (error) {
            handleError(res, error);
        }
    }
    static async exportSendCSV(req, res){
        try{
            const csvFilePath = await reportService.exportSendReport();
            res.download(csvFilePath, 'envioTaloes.csv');
        }catch(error){
            console.error("Erro ao exportar CSV:", error);
            res.status(500).json({ message: 'Error exporting CSV', error: error.message });
        }
    }

    static async exportReceiptCSV(req, res){
        try{
            const csvFilePath = await reportReceiptService.exportReceiptReport();
            res.download(csvFilePath, 'envioTaloes.csv');
        }catch(error){
            console.error("Erro ao exportar CSV:", error);
            res.status(500).json({ message: 'Error exporting CSV', error: error.message });
        }
    }
}

module.exports = TalonController;
