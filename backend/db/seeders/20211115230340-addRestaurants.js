'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomName() {
    const names = [
        "Bar",
        "Cafe",
        "Coffee Shop",
        "Pizzeria",
        "Grill",
        "Bistro",
        "Inn",
        "Diner",
        "Chophouse",
        "Saloon",
        "Canteen"
    ]
    let nameNum = getRandomNum(0, names.length);
    return names[nameNum]
}

const restaurants = [];

for (let i = 0; i <= 100; i++) {
    let newRestaurant = {
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        name: faker.name.firstName() + `'s ${randomName()}`,
        logo: "placeholder",
        ownerId: getRandomNum(1, 100),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    restaurants.push(newRestaurant)
}









module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkInsert('Restaurants', restaurants, [
          {

      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('Restaurants', null, {});

  }
};
