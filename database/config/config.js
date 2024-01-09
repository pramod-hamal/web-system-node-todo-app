const port = process.env.MYSQL_PORT || 3306;
const host = process.env.MYSQL_HOST || "localhost";
const username = process.env.MYSQL_USER || "root";
const password = process.env.MYSQL_PASSWORD || "admin";
const database = process.env.MYSQL_DBNAME || "todo_db";

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci", // this work
    },
    logging: process.env.NODE_ENV === "development",
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci", // this work
    },
    logging: process.env.NODE_ENV === "development",
  },
};
