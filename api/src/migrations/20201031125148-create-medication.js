'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('medication', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING },
      side_effects: { type: Sequelize.STRING },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('medication');
  }
};
