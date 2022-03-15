const { Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    'groupomania',
    'root',
    '@MxiL93ouI',
    {
        host: "localhost",
        dialect: "mysql"
    }
);

const initDb = () => {
    return sequelize.sync({ force: true }) 
    .then((_) => console.log("La base de donnée est bien synchro"))
};




module.exports = {
    initDb
};