'use strict';
module.exports = (sequelize, DataTypes) => {
  class ParkingDetail extends sequelize.Sequelize.Model {
    get id() {
      return this.id
    }

    get memberId() {
      return this.memberId
    }
    
    get vehicleId() {
      return this.vehicleId
    }

    get buildingId() {
      return this.buildingId
    }

    get checkIn() {
      return this.checkIn
    }

    get checkOut() {
      return this.checkOut
    }

    get paymentStatus() {
      return this.paymentStatus
    }

    get cost() {
      return this.cost
    }
  }
  ParkingDetail.init({
    memberId: DataTypes.INTEGER,
    vehicleId: DataTypes.STRING,
    buildingId: DataTypes.INTEGER,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    paymentStatus: DataTypes.BOOLEAN,
    cost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ParkingDetail'
  })

  ParkingDetail.associate = function(models) {
    // associations can be defined here
    ParkingDetail.hasOne(models.Payment, {
      foreignKey: 'parkingId'
    }),
    ParkingDetail.belongsTo(models.Vehicle, {
      foreignKey: 'vehicleId'
    }),
    ParkingDetail.belongsTo(models.Member, {
      foreignKey: 'memberId'
    }),
    ParkingDetail.belongsTo(models.Building, {
      foreignKey: 'buildingId'
    })
  };
  return ParkingDetail;
};