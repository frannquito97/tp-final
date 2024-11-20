import { Sequelize } from "sequelize";

const sequelize = new Sequelize('f1games', 'root', '12345',{
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;