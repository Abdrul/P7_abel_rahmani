const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../model/userModel');
const PostsModel = require('../model/postsModel');
const CommentsModel = require('../model/commentsModel');



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
const Comments = CommentsModel(sequelize, DataTypes);

User.hasMany(Posts, { foreignKey: 'user_id' /*, onDelete: 'CASCADE' */});
Posts.hasMany(Comments, { foreignKey: 'comment_id' });
User.hasMany(Comments, { foreignKey: 'user_comment_id'});

const initDb = () => {
    return sequelize.sync({ force: true }) 
    .then(() => {
        console.log("La base de donnée est bien synchro")
    })
}


module.exports = {
    initDb, User, Posts, Comments
};