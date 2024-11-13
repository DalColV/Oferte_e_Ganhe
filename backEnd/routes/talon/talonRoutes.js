const express = require('express');
const path = require('path');
const router = express.Router();
const { insertTalon, deleteTalonLogs, editTalon, talonConsultAll, talonConsultById } = require('../../services/talonServices');

// POST Route to create a new talon log
router.post('/talon/send-talon', async (req, res) => {
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
        const newTalon = await insertTalon(
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
});

// GET Route to retrieve all talon logs
router.get('/talon-logs', async (req, res) => {
    try {
        const talons = await talonConsultAll();
        res.status(200).json(talons);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching talon logs', error: error.message });
    }
});

// GET Route to retrieve a talon log by ID
router.get('/talon-logs/:talon_id', async (req, res) => {
    const { talon_id } = req.params;

    try {
        const talon = await talonConsultById(talon_id);

        if (talon) {
            res.status(200).json(talon);
        } else {
            res.status(404).json({ message: 'Talon log not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching talon log by ID', error: error.message });
    }
});

// PUT Route to edit a talon log
router.put('/edit-talon/:talon_id', async (req, res) => {
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
        const updateTalon = await editTalon(
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
        if (updateTalon) {
            res.status(200).json({ message: "Talon Updated Successfully!", talon_logs: updateTalon });
        } else {
            res.status(404).json({ message: 'Talon not found!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
    }
});

// DELETE Route to delete a talon log
router.delete('/delete-talon/:talon_id', async (req, res) => {
    const { talon_id } = req.params;

    try {
        const deletedTalon = await deleteTalonLogs(talon_id);
        if (deletedTalon) {
            res.status(200).json({ message: 'Talon deleted successfully!', talon_logs: deletedTalon });
        } else {
            res.status(404).json({ message: 'Talon not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting talon', error: error.message });
    }
});

module.exports = router;
