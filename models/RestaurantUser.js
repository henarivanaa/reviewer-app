'use strict';
module.exports = (sequelize, DataTypes) => {
  const RestaurantUser = sequelize.define('RestaurantUser', {
    review_rating: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  RestaurantUser.associate = function(models) {
    // associations can be defined here
  };
  return RestaurantUser;
};