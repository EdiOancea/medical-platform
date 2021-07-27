'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monitored_activities', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      activity_name: { type: Sequelize.STRING },
      start_time: { type: Sequelize.DATE },
      end_time: { type: Sequelize.DATE },
      patient_id: {
        type: Sequelize.UUID,
        references: { model: 'patients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('monitored_activities');
  }
};
