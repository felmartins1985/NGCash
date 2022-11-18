module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      password: {
        type: Sequelize.STRING(100),
      },
      accountId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id',
        }
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};