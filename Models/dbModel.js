const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "JWT", //database name
  "root", //username
  "Vaibhav6898@", //password
  {
    host: "localhost",
    logging: false,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((e) => {
    console.error("Error connecting to database : " + e);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//User Model
db.users = require("./users")(sequelize, Sequelize.DataTypes);

db.sequelize
  .sync({}) //force:true
  .then(() => {
    console.log("Table created!");
  })
  .catch((e) => {
    console.log("An error occured while creating the table!");
  });

module.exports = db;
