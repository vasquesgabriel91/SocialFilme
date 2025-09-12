import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database.js";

class Follower extends Model {}

Follower.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    followersId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    followingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Follower",
    tableName: "followers",
    indexes: [
      {
        unique: true,
        fields: ["followersId", "followingId"],
      }
    ],
  }
);
export default Follower;
