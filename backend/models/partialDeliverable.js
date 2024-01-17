module.exports = (sequelize, DataTypes) => {
  return sequelize.define("partialDeliverable", {
    nume: DataTypes.STRING,
    link: DataTypes.STRING,
  });
};
