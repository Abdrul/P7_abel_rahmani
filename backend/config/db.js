const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../model/userModel');
const PostsModel = require('../model/postsModel');




const sequelize = new Sequelize(
    'groupomania',
    `${process.env.DB_USER}`,
    `${process.env.DB_PASSWORD}`,
    {
        host: "localhost",
        dialect: "mysql"
    }
);

const User = UserModel(sequelize, DataTypes);
const Posts = PostsModel(sequelize, DataTypes);

User.hasMany(Posts, { foreignKey: 'user_id' /*, onDelete: 'CASCADE' */});

const initDb = () => {
    return sequelize.sync({ force: true }) 
    .then(() => {
        console.log("La base de donnée est bien synchro")
    })
}


module.exports = {
    initDb, User, Posts
};