const talonService = require('../services/talonServices');

class TalonController {

    // POST - Create a new Talon 

    static async createTalon(req, res) {
        const {
            inventory_id,
            shipment,
            talon_quantity,
            send_date,
            order_date,
            talon_status,
            receive_date,
            registration
        } = req.body;

        try {
            const newTalon = await talonService.insertTalon(
                inventory_id,
                shipment,
                talon_quantity,
                send_date,
                order_date,
                talon_status,
                receive_date,
                registration
            );
            res.status(201).json({ message: "Talon Created Successfully!", talon_logs: newTalon });
        } catch (error) {
            res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
        }
    }

    // GET - Retrieve all Talon 

    static async consultAllTalons(req, res) {
        try {
            const talons = await talonService.talonConsultAll();
            res.status(200).json(talons);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching talon logs', error: error.message });
        }
    }

    // GET - Retrieve a specific Talon by ID

    static async consultTalonById(req, res) {
        const { talon_id } = req.params;

        try {
            const talon = await talonService.talonConsultById(talon_id);

            if (talon) {
                res.status(200).json(talon);
            } else {
                res.status(404).json({ message: 'Talon log not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching talon log by ID', error: error.message });
        }
    }

    // PUT - Update a Talon 

    static async updateTalon(req, res) {
        const { talon_id } = req.params;
        const {
            inventory_id,
            shipment,
            talon_quantity,
            send_date,
            order_date,
            talon_status,
            receive_date,
            registration
        } = req.body;

        try {
            const updatedTalon = await talonService.editTalon(
                talon_id,
                inventory_id,
                shipment,
                talon_quantity,
                send_date,
                order_date,
                talon_status,
                receive_date,
                registration
            );
            if (updatedTalon) {
                res.status(200).json({ message: "Talon Updated Successfully!", talon_logs: updatedTalon });
            } else {
                res.status(404).json({ message: 'Talon not found!' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
        }
    }

    // DELETE - Delete a Talon 
    
    static async deleteTalon(req, res) {
        const { talon_id } = req.params;

        try {
            const deletedTalon = await talonService.deleteTalonLogs(talon_id);
            if (deletedTalon) {
                res.status(200).json({ message: 'Talon deleted successfully!', talon_logs: deletedTalon });
            } else {
                res.status(404).json({ message: 'Talon not found.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting talon', error: error.message });
        }
    }
}

module.exports = TalonController;
