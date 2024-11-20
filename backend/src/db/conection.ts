import { Sequelize } from "sequelize";

const sequelize = new Sequelize('f1games', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;