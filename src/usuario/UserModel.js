import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database.js";

class User extends Model {}

User.init({
    id: { type: DataTypes.UUID, primaryKey: true,  defaultValue: DataTypes.UUIDV4 },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    bio: { type: DataTypes.STRING, allowNull: true },

},{
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
});

export default User;