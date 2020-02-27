'use strict';
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const request = new XMLHttpRequest()
let key = "066a4ef447882d866f5279e51a556fd6"
let url = "https://developers.zomato.com/api/v2.1/search?entity_id=11052&entity_type=city"

const api = (url, key) => {
  request.open("GET", url, false)
  request.setRequestHeader("user-key", key)
  request.send(null)
  return JSON.parse(request.responseText).restaurants
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    let insert = []
    let datas = api(url, key)
    datas.forEach(data => {
      insert.push({
        name: data.restaurant.name,
        location: data.restaurant.location.latitude+'_'+data.restaurant.location.longitude,
        phone_number:data.restaurant.phone_numbers,
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    });
    return queryInterface.bulkInsert('Restaurants', insert, {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
