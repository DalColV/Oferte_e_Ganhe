const TalonLog  = require('../models/talonModel');

// Função para criar um novo registro de Talon
async function insertTalon({ 
    inventory_id, 
    shipment, 
    talon_quantity, 
    send_date, 
    order_date, 
    talon_status, 
    receive_date, 
    registration 
}) {
    try {
        const newTalon = await TalonLog.create({
            inventory_id,
            shipment,
            talon_quantity,
            send_date,
            order_date,
            talon_status,
            receive_date,
            registration,
        });
        return newTalon;
    } catch (error) {
        console.error('Error creating talon log:', error);
        throw error;
    }
}

// Função para consultar todos os registros de Talon
async function talonConsultAll() {
    try {
        const talons = await TalonLog.findAll();
        return talons;
    } catch (error) {
        console.error('Error fetching all talons:', error);
        throw error;
    }
}

// Função para consultar um registro de Talon por ID
async function talonConsultById(talon_id) {
    try {
        const talon = await TalonLog.findByPk(talon_id);
        if (!talon) {
            throw new Error(`Talon log with ID ${talon_id} not found.`);
        }
        return talon;
    } catch (error) {
        console.error('Error fetching talon by ID:', error);
        throw error;
    }
}

// Função para atualizar um registro de Talon
async function editTalon(talon_id, {
    inventory_id, 
    shipment, 
    talon_quantity, 
    send_date, 
    order_date, 
    talon_status, 
    receive_date, 
    registration 
}) {
    try {
        const talon = await TalonLog.findByPk(talon_id);
        if (!talon) {
            throw new Error(`Talon log with ID ${talon_id} not found.`);
        }

        await talon.update({
            inventory_id,
            shipment,
            talon_quantity,
            send_date,
            order_date,
            talon_status,
            receive_date,
            registration,
        });

        return talon;
    } catch (error) {
        console.error('Error updating talon log:', error);
        throw error;
    }
}

// Função para deletar um registro de Talon
async function deleteTalonLogs(talon_id) {
    try {
        const talon = await TalonLog.findByPk(talon_id);
        if (!talon) {
            throw new Error(`Talon log with ID ${talon_id} not found.`);
        }

        await talon.destroy();
        return talon;
    } catch (error) {
        console.error('Error deleting talon log:', error);
        throw error;
    }
}

module.exports = { 
    insertTalon, 
    talonConsultAll, 
    talonConsultById, 
    editTalon, 
    deleteTalonLogs 
};
