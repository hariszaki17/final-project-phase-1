'use strict';
module.exports = (sequelize, DataTypes) => {
  class Building extends sequelize.Sequelize.Model {

    get id() {
      return this.id
    }

    get name() {
      return this.name
    }

    get type() {
      return this.type
    }

    get address() {
      return this.address
    }

    get carCapacity() {
      return this.carCapacity
    }

    get motorCapacity() {
      return this.motorCapacity
    }
  }
  Building.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    address: DataTypes.STRING,
    carCapacity: DataTypes.INTEGER,
    motorCapacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Building'
  })
  Building.associate = function(models) {
    // associations can be defined here
    Building.belongsToMany(models.Member, {
      through: 'ParkingDetail',
      foreignKey: 'buildingId'
    }),
    Building.belongsToMany(models.Vehicle, {
      through: 'ParkingDetail',
      foreignKey: 'buildingId'
    })
  };
  return Building;
};