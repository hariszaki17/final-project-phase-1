'use strict';
module.exports = (sequelize, DataTypes) => {
  class admin extends sequelize.Sequelize.Model {
    get id() {
      return this.id
    }
    get username() {
      return this.username
    }
    get password() {
      return this.id
    }
  }
  admin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admin'
  })
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};