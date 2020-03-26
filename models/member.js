'use strict';
module.exports = (sequelize, DataTypes) => {
  class Member extends sequelize.Sequelize.Model {
    get id() {
      return this.id
    }

    get name() {
      return this.name
    }

    get type() {
      return this.type
    }

    get email() {
      return this.email
    }

    get balance() {
      return this.balance
    }
  }
  Member.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    email: DataTypes.STRING,
    balance: DataTypes.DECIMAL
  }, {
    sequelize,
    hooks: {
      beforeCreate: (Member, options) => {
        Member.balance = 0
      }
    },
    modelName: 'Member'
  })
  Member.associate = function(models) {
    // associations can be defined here
    Member.belongsToMany(models.Vehicle, {
      through: 'ParkingDetail',
      foreignKey: 'memberId'
    }),
    Member.belongsToMany(models.Building, {
      through: 'ParkingDetail',
      foreignKey: 'memberId'
    })
    Member.hasMany(models.Payment, {
      foreignKey: 'memberId'
    })
  };
  return Member;
};