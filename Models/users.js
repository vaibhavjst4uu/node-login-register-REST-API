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
          args:true,  
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
        //   isAlphanumeric: {
        //     msg: "Password should contain alphanumeric characters only.",
        //   },
        //   is: {
        //     args: /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
        //     msg: 'Your password should contain small,capital letters,numbers 0-9 and special characters .',
        //   },
          // len:[4,10],
          isStrongPassword(value) {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,15}/.test(value)) {
              throw new Error("Password must have 1 lowercase, 1 uppercase, 1 special character, and be 5-10 characters long.");
            }
        },
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
