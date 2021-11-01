const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Comments extends Model {}

Comments.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comments",
  }
);

module.exports = Comments;
