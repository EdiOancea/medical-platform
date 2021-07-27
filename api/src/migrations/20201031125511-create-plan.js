'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plans', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING },
      start_date: { type: Sequelize.DATE },
      end_date: { type: Sequelize.DATE },
      patient_id: {
        type: Sequelize.UUID,
        references: { model: 'patients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plans');
  }
};
