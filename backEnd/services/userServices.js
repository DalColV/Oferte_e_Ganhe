const User = require('../model/userModel');  

// Função para inserir um novo usuário
const insertUser = async (registration, username, store_id, profile_id, email, password) => {
    try {
        const user = await User.insertUser(registration, username, store_id, profile_id, email, password);
        return user;
    } catch (error) {
        console.error('Error in service while inserting user:', error);
        throw error;
    }
};

// Função para editar um usuário
const editUser = async (registration, username, store_id, profile_id, email, password) => {
    try {
        const user = await User.editUser(registration, username, store_id, profile_id, email, password);
        return user;
    } catch (error) {
        console.error('Error in service while editing user:', error);
        throw error;
    }
};

// Função para excluir um usuário
const deleteUser = async (registration) => {
    try {
        const deletedUser = await User.deleteUser(registration);
        return deletedUser;
    } catch (error) {
        console.error('Error in service while deleting user:', error);
        throw error;
    }
};

// Função para consultar todos os usuários
const userConsultAll = async () => {
    try {
        const users = await User.userConsultAll();
        return users;
    } catch (error) {
        console.error('Error in service while consulting users:', error);
        throw error;
    }
};

// Função para consultar um usuário por registro
const userConsultByRegistration = async (registration) => {
    try {
        const user = await User.userConsultByRegistration(registration);
        return user;
    } catch (error) {
        console.error('Error in service while consulting user by registration:', error);
        throw error;
    }
};

module.exports = { insertUser, editUser, deleteUser, userConsultAll, userConsultByRegistration };
