module.exports = (sequelize, DataTypes) => {
  return sequelize.define("project", {
    titlu: DataTypes.STRING,
  });
};
