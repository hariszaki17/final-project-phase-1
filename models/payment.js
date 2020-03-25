'use strict';
module.exports = (sequelize, DataTypes) => {
  class Payment extends sequelize.Sequelize.Model {
    get id() {
      return this.id
    }

    get parkingId() {
      return this.parkingId
    }

    get memberId() {
      return this.memberId
    }

    get paymentMethod() {
      return this.paymentMethod
    }

    get discount() {
      return this.discount
    }

    get totalCost() {
      return this.totalCost
    }
  }
  Payment.init({
    parkingId: DataTypes.STRING,
    memberId: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    discount: DataTypes.DECIMAL,
    totalCost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Payment'
  })
  Payment.associate = function(models) {
    // associations can be defined here
    Payment.belongsTo(models.ParkingDetail, {
      foreignKey: 'parkingId'
    }),
    Payment.belongsTo(models.Member, {
      foreignKey: 'memberId'
    })
  };
  return Payment;
};