'use strict';
const { hasher, bcrypt } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Email must be filled!' }
      }
    },
    phone_number: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Username must be filled!' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password must be filled!' }
      }
    },
    role: DataTypes.STRING
  }, { 
    hooks: {
      beforeCreate: (instance, options) => {
        instance.role = "user level"
        return hasher(instance.password, 10)
          .then(hashed => {
            instance.password = hashed
          })
      }
    },
    sequelize 
  })
  User.associate = function(models) {
    User.belongsToMany(models.Restaurant, { through: models.RestaurantUser, foreignKey: 'userId' })
  };
  return User;
};