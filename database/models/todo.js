"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user" });

    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      isFinished: DataTypes.BOOLEAN,
      user: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Todo",
      tableName: "todo"
    }
  );
  return Todo;
};
