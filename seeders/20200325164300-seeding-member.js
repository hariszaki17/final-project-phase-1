'use strict';
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./seeders/seeding-member.json'))
// console.log(data)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Members', data,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Members', null,{})
    
  }
};
