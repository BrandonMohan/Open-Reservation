'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    address: DataTypes.STRING(50),
    city: DataTypes.STRING(50),
    state: DataTypes.STRING(50),
    name: DataTypes.STRING(50),
    logo: DataTypes.STRING(256),
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
