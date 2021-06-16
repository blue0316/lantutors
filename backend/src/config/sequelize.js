import Sequelize from "sequelize";
console.log(
  "x",
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_DIALECT
);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
