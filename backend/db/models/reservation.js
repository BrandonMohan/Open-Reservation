'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
    Reservation.belongsTo(models.Restaurant, {foreignKey: 'restaurantId'})
    Reservation.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Reservation;
};
