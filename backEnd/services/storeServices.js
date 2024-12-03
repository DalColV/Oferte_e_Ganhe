const Store  = require('../models/storeModel');

// Função para criar uma nova loja
async function insertStore(store_id, store_name, street, cep, number, is_matriz = false) {
    try {
        const newStore = await Store.create({
            store_id,
            store_name,
            street,
            cep,
            number,
            is_matriz,
        });
        return newStore;
    } catch (error) {
        console.error('Something went wrong while creating the store:', error);
        throw error;
    }
}


// Função para consultar todas as lojas
async function consultStores() {
    try {
        const stores = await Store.findAll();
        return stores;
    } catch (error) {
        console.error('Something went wrong while fetching stores:', error);
        throw error;
    }
}

// Função para consultar uma loja por ID
async function consultStoreById(store_id) {
    try {
        const store = await Store.findOne({
            where: { store_id }
        });
        return store;
    } catch (error) {
        console.error('Something went wrong while fetching the store by ID:', error);
        throw error;
    }
}

// Função para editar uma loja
async function editStore(store_id, store_name, street, cep, number, is_matriz) {
    try {
        const updatedStore = await Store.update(
            { store_name, street, cep, number, is_matriz },
            {
                where: { store_id },
                returning: true
            }
        );

        return updatedStore[1][0];  // Retorna o primeiro objeto da resposta
    } catch (error) {
        console.error('Something went wrong while updating the store:', error);
        throw error;
    }
}

// Função para deletar uma loja
async function deleteStore(store_id) {
    try {
        const deletedStore = await Store.destroy({
            where: { store_id },
            returning: true
        });

        return deletedStore;
    } catch (error) {
        console.error('Something went wrong while deleting the store:', error);
        throw error;
    }
}

module.exports = { insertStore, consultStores, consultStoreById, editStore, deleteStore };
