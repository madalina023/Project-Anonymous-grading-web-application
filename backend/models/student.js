module.exports = (sequelize, DataTypes) => {
  return sequelize.define("student", {
    nume: DataTypes.STRING,
    prenume: DataTypes.STRING,
    email: DataTypes.STRING,
    parola: DataTypes.STRING,
  });
};
