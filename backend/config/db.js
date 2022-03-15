const { Sequelize, DataTypes} = require('sequelize');
const UserModel = require('../model/userModel');


const sequelize = new Sequelize(
    'groupomania',
    'root',
    '@MxiL93ouI',
    {
        host: "localhost",
        dialect: "mysql"
    }
);

const User = UserModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({ force: true }) 
    .then(() => {
        console.log("La base de donnée est bien synchro")
    })
}


module.exports = {
    initDb, User
};