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

function randomLogo() {
    const logos = [
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_45092251.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_59509361-e1571108905481.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_86252940-e1571406514267.jpg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_40533723-e1571112100668.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_99478007-e1571112167353.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_89348086-e1571112998256.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_70584090-e1571113643658.jpg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_72730158-e1571110735270.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_90692173-e1571110647786.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_93150414-e1571110566194.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_98157495-e1571110518414.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_74455091-e1571114936278.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_57615794-e1571114994767.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/1d712e10-525a-4cc2-84f2-36e66336c0d0-e1571115090968.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_66602497-e1571115384951.jpg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_92127945-e1571116006606.jpg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_102682959-e1571116039684.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_80534038-e1571406204855.png?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/f87d59b6-c3df-4ce0-a9a2-073c8b98d2a8.jpg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_94283857-e1571185890515.jpg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_89345375.jpg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/sian-whiterabbit-e1583319656901.jpg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/alchemist-restaurant-logo.jpeg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_59065066-scaled-e1583322296849.jpeg?auto=format&q=60&fit=max&w=930",
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_51207186-e1571403645427.png?auto=format&q=60&fit=max&w=930"

    ]
    let logoNum = getRandomNum(0, logos.length)
    return logos[logoNum]
}

const restaurants = [];

for (let i = 0; i <= 100; i++) {
    let newRestaurant = {
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        name: faker.name.firstName() + `'s ${randomName()}`,
        logo: randomLogo(),
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
