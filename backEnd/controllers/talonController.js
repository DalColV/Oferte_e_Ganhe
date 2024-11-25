const talonService = require('../services/talonServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');

class TalonController {
    static async createTalon(req, res) {
        const { inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration } = req.body;
        try {
            const newTalon = await talonService.insertTalon(
                inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration
            );
            sendSuccess(res, 201, "Talon Created Successfully!", newTalon);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async consultAllTalons(req, res) {
        try {
            const talons = await talonService.talonConsultAll();
            sendSuccess(res, 200, "Talons retrieved successfully", talons);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async consultTalonById(req, res) {
        const { talon_id } = req.params;
        try {
            const talon = await talonService.talonConsultById(talon_id);
            if (talon) {
                sendSuccess(res, 200, "Talon found", talon);
            } else {
                throw new AppError("Talon log not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    static async updateTalon(req, res) {
        const { talon_id } = req.params;
        const { inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration } = req.body;
        try {
            const updatedTalon = await talonService.editTalon(
                talon_id, inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration
            );
            if (updatedTalon) {
                sendSuccess(res, 200, "Talon Updated Successfully!", updatedTalon);
            } else {
                throw new AppError("Talon not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    static async deleteTalon(req, res) {
        const { talon_id } = req.params;
        try {
            const deletedTalon = await talonService.deleteTalonLogs(talon_id);
            if (deletedTalon) {
                sendSuccess(res, 200, "Talon deleted successfully", deletedTalon);
            } else {
                throw new AppError("Talon not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}

module.exports = TalonController;
