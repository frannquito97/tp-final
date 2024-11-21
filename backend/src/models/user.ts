import { DataTypes } from "sequelize";
import sequelize from "../db/conection";

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    password:{
        type: DataTypes.STRING
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default User;