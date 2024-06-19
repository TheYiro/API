import Sequelize from 'sequelize';

const sequelize = new Sequelize('railway', 'root', 'xggZlWeHwcEoRKXKufkJoSGUlvJkBIPA', {
    host: 'monorail.proxy.rlwy.net',
    dialect: 'mysql',
    port: 18468
});

export default sequelize