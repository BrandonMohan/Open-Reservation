'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
    Restaurant.hasMany(models.Reservation, {foreignKey: 'restaurantId'})
    Restaurant.hasMany(models.Review, {foreignKey: 'restaurantId'})
    Restaurant.belongsTo(models.User, {foreignKey: 'ownerId'})
  };
  return Restaurant;
};
