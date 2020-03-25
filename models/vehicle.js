'use strict';
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends sequelize.Sequelize.Model {
    get id() {
      return this.id
    }

    get type() {
      return this.type
    }

    get model() {
      return this.model
    }
    
  }
  Vehicle.init({
    type: DataTypes.STRING,
    model: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vehicle'
  })
  Vehicle.associate = function(models) {
    // associations can be defined here
    Vehicle.belongsToMany(models.Member, {
      through: 'ParkingDetail',
      foreignKey: 'vehicleId'
    }),
    Vehicle.belongsToMany(models.Building, {
      through: 'ParkingDetail',
      foreignKey: 'vehicleId'
    })
  };
  return Vehicle;
};