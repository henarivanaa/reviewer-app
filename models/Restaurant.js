'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Restaurant extends Model {}
  Restaurant.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    rating: DataTypes.INTEGER
  },{ sequelize })
  Restaurant.associate = function(models) {
    Restaurant.belongsToMany(models.User, { through: models.RestaurantUser, foreignKey: 'restaurantId' })
  };
  return Restaurant;
};