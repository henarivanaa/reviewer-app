'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class RestaurantUser extends Model {}
  RestaurantUser.init({
    review_rating: DataTypes.INTEGER,
    review_desc: DataTypes.STRING,
    restaurantId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, { sequelize })
  RestaurantUser.associate = function(models) {
    // associations can be defined here
  };
  return RestaurantUser;
};