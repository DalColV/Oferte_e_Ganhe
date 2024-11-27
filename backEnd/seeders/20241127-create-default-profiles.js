'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('PROFILE', [
            {
                profile_name: 'Administrador do Sistema',
                has_profile_management: true,
                has_user_management: true,
                has_inventory_management: true,
                has_maintenance: true,
                has_store_management: true,
                has_shipping: true,
                has_receiving: true,
            },
            {
                profile_name: 'Gerente de Loja',
                has_profile_management: false,
                has_user_management: false,
                has_inventory_management: true,
                has_maintenance: true,
                has_store_management: true,
                has_shipping: true,
                has_receiving: true,
            },
            {
                profile_name: 'Caixa de Loja',
                has_profile_management: false,
                has_user_management: false,
                has_inventory_management: false,
                has_maintenance: true,
                has_store_management: false,
                has_shipping: false,
                has_receiving: false,
            },
            {
                profile_name: 'Sem Acesso',
                has_profile_management: false,
                has_user_management: false,
                has_inventory_management: false,
                has_maintenance: false,
                has_store_management: false,
                has_shipping: false,
                has_receiving: false,
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('PROFILE', null, {});
    },
};
