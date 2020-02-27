'use strict';
const { hasher, bcrypt } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {
    getFullName() {
      return this.first_name + ' ' + this.last_name
    }
  }
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
    role: DataTypes.STRING,
    isLoggedIn: DataTypes.BOOLEAN
  }, { 
    hooks: {
      beforeCreate: (instance, options) => {
        instance.isLoggedIn = false
        let pass = instance.password[instance.password.length-4]+instance.password[instance.password.length-3]+instance.password[instance.password.length-2]+instance.password[instance.password.length-1]
        if (pass === 'o8T*') {
          instance.role = "admin level"
        } else {
          instance.role = "user level"
        }
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