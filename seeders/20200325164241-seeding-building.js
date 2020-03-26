'use strict';
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./seeders/seeding-building.json'))
// console.log(data)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Buildings', data,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Buildings', null,{})
    
  }
};
