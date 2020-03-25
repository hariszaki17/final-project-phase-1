'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ParkingDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      memberId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Members',
          key: 'id'
        }
      },
      vehicleId: {
        type: Sequelize.STRING,
        references: {
          model: 'Vehicles',
          key: 'id'
        }
      },
      buildingId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Buildings',
          key: 'id'
        }
      },
      checkIn: {
        type: Sequelize.DATE
      },
      checkOut: {
        type: Sequelize.DATE
      },
      paymentStatus: {
        type: Sequelize.BOOLEAN
      },
      cost: {
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
    return queryInterface.dropTable('ParkingDetails');
  }
};