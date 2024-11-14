import { DataTypes } from "sequelize";
import sequelize from "../db/conection";

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default User;