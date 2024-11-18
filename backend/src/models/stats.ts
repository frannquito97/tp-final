import { DataTypes } from "sequelize";
import sequelize from "../db/conection";
import User from "./user";

const Stats = sequelize.define('stats', {
    id: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: User,
            key: 'id'
        }
    },
    score:{
        type: DataTypes.INTEGER
    },
    error:{
        type: DataTypes.INTEGER
    }
});

export default Stats;