'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    review: DataTypes.STRING(150),
    rating: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {foreignKey: 'userId'})
    Review.belongsTo(models.Restaurant, {foreignKey: 'restaurantId'})
  };
  return Review;
};
