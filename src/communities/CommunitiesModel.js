import { DataTypes, Model  } from "sequelize";  
import sequelize from "../database/database.js";

class Community extends Model {}

Community.init({
    id: { type: DataTypes.UUID, primaryKey:true, defaultValue: DataTypes.UUIDV4 },
    user_id: { type: DataTypes.UUID, allowNull: false, references: { model: "users", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE" },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    rules: { type: DataTypes.TEXT, allowNull: false },
    visibility: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "public" },
},{
    sequelize,
    modelName: "Community",
    tableName: "communities",
    timestamps: true,
});
export default Community;
