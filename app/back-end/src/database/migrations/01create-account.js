module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      balance:{
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  },
};