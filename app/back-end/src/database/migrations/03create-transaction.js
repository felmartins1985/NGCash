module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      debitedAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      creditedAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      value: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions');
  },
};