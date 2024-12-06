'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Alterando a tabela talon_logs para adicionar os campos store_id e expected_delivery
    await queryInterface.addColumn('talon_logs', 'store_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'store',
        key: 'store_id',
      },
    });

    await queryInterface.addColumn('talon_logs', 'expected_delivery', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertendo a migração (removendo os campos adicionados)
    await queryInterface.removeColumn('talon_logs', 'store_id');
    await queryInterface.removeColumn('talon_logs', 'expected_delivery');
  }
};
