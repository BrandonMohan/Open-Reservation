'use strict';
const faker = require('faker');

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const reviews = [];

for(let i = 0; i <= 200; i++) {
    let newReview = {
        userId: getRandomNum(1, 100),
        restaurantId: getRandomNum(1, 100),
        review: faker.lorem.sentence(),
        rating: getRandomNum(1, 5),
        createdAt: new Date(),
        updatedAt: new Date()
    }
    reviews.push(newReview)
}










module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkInsert('Reviews', reviews, [{

      }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('Reviews', null, {});

  }
};
