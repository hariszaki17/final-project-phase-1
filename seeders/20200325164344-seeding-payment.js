'use strict';
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./seeders/seeding-payment.json'))

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Payments', data,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Payments', null,{})
    
  }
};
