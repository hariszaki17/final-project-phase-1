'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parkingId: {
        type: Sequelize.STRING,
        references: {
          model: 'ParkingDetails',
          key: 'id'
        }
      },
      memberId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Members',
          key: 'id'
        }
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.DECIMAL
      },
      totalCost: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Payments');
  }
};