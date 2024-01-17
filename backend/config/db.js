const Sequelize = require("sequelize");

const sequelize = new Sequelize("grading_app", "root", "password", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
