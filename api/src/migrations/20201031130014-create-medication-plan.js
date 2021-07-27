'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('medication_plans', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      dosage: { type: Sequelize.INTEGER },
      unit: { type: Sequelize.STRING },
      interval: { type: Sequelize.INTEGER },
      medication_id: {
        type: Sequelize.UUID,
        references: { model: 'medication', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      plan_id: {
        type: Sequelize.UUID,
        references: { model: 'plans', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('medication_plans');
  }
};
