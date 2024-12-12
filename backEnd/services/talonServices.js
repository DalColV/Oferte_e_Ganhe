const TalonLogs  = require('../models/talonModel');
const Inventory = require('../models/inventoryModel');

// Função para criar um novo registro de Talon
async function insertTalon({ 
    inventory_id, 
    shipment, 
    talon_quantity, 
    send_date, 
    order_date,
    talon_status, 
    receive_date, 
    registration,
    store_id, 
}) {
    try {
        const newTalon = await TalonLogs.create({
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
        return newTalon;
    } catch (error) {
        console.error('Error creating talon log:', error);
        throw error;
    }
}

// Função para consultar todos os registros de Talon
async function talonConsultAll() {
    try {
        const talons = await TalonLogs.findAll();
        return talons;
    } catch (error) {
        console.error('Error fetching all talons:', error);
        throw error;
    }
}

// Função para consultar um registro de Talon por ID
async function talonConsultById(talon_id) {
    try {
        const talon = await TalonLogs.findByPk(talon_id);
        if (!talon) {
            throw new Error(`Talon log with ID ${talon_id} not found.`);
        }
        return talon;
    } catch (error) {
        console.error('Error fetching talon by ID:', error);
        throw error;
    }
}

async function getTalonsByStore(store_id) {
    try {
        const talons = await TalonLogs.findAll({
            where: { store_id },
        });

        if (!talons || talons.length === 0) {
            throw new Error(`No talons found for store_id: ${store_id}`);
        }

        return talons;
    } catch (error) {
        console.error('Erro ao buscar talons:', error);
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
    registration,
    store_id,
    
}) {
    try {
        const talon = await TalonLogs.findByPk(talon_id);
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
            store_id,
            
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
        const talon = await TalonLogs.findByPk(talon_id);
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

async function updateCurrentQuantity(talon_id) {
    try {
        // Buscar o registro na tabela talon_logs com o talon_id fornecido
        const talonLog = await TalonLogs.findOne({ where: { talon_id } });

        if (!talonLog) {
            throw new Error('Talon log not found');
        }

        const { inventory_id, talon_quantity } = talonLog;

        // Buscar o registro correspondente na tabela inventory
        const inventoryRecord = await Inventory.findOne({ where: { inventory_id } });

        if (!inventoryRecord) {
            throw new Error('Inventory not found');
        }

        // Atualizar o current_quantity somando o talon_quantity
        const newQuantity = inventoryRecord.current_quantity + talon_quantity;

        await Inventory.update(
            { current_quantity: newQuantity },
            { where: { inventory_id } }
        );

        return { message: 'Current quantity updated successfully', newQuantity };
    } catch (error) {
        throw error;
    }}

module.exports = { 
    insertTalon, 
    talonConsultAll, 
    talonConsultById, 
    editTalon, 
    deleteTalonLogs,
    getTalonsByStore,
    updateCurrentQuantity 
};
