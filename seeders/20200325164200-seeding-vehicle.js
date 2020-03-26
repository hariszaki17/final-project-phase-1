'use strict';
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./seeders/seeding-vehicle.json'))
// console.log(data)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Vehicles', data,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Vehicles', null,{})
    
  }
};
