const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("./dbModel");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "email already in use",
        },
        validate: {
          isEmail: {
            msg: "Please enter a valid Email Id",
          },
          notEmpty: { msg: "Email cannot be Empty" },
        },
        // defaultValue : "test@gmail.com"
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            msg: "Password should contain alphanumeric characters only.",
          },
          // len:[4,10],
          notEmpty: { msg: "Password cannot be empty" },
        },
      },
      // mobile:{
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     // len: [10,10],

      // }
    },
    {
      timestamps: false,
    }
  );
  return users;
};
