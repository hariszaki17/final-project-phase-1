'use strict';
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./seeders/seeding-parking-detail.json'))
// console.log(data)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ParkingDetails', data,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ParkingDetails', null,{})
    
  }
};
