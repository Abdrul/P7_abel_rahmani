const { Sequelize, DataTypes} = require('sequelize');
const UserModel = require('../model/userModel');
const PostsModel = require('../model/postsModel');


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
const Posts = PostsModel(sequelize, DataTypes);

Posts.belongsTo(User, { foreignKey: 'user_id' });

const initDb = () => {
    return sequelize.sync({ force: true }) 
    .then(() => {
        console.log("La base de donnée est bien synchro")
    })
}


module.exports = {
    initDb, User, Posts
};