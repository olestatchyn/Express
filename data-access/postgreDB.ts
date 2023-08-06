import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: "homework",
    username: "postgres",
    password: "12345",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
});

export default sequelize;