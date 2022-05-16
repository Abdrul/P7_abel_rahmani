const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../model/userModel');
const PostsModel = require('../model/postsModel');
const CommentsModel = require('../model/commentsModel');
const LikesModel = require('../model/likesModel');



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
const Likes = LikesModel(sequelize, DataTypes);

User.hasMany(Posts, { foreignKey: 'user_id', onDelete: 'CASCADE'});
Posts.belongsTo(User, {as: "user", foreignKey:'user_id'})
Posts.hasMany(Comments, { foreignKey: 'post_id', as:'comments', onDelete: 'CASCADE' });
Comments.belongsTo(Posts, { foreignKey:'post_id', as: "post" });
User.hasMany(Comments, { foreignKey: 'user_id'});
Comments.belongsTo(User, {foreignKey: 'user_id', as: 'user'})
Posts.hasMany(Likes, {foreignKey: 'post_id', as: 'likes', onDelete: 'CASCADE'});
User.hasMany(Likes, {foreignKey: 'user_id'});


const initDb = () => {
    return sequelize.sync({ force: true }) 
    .then(() => {
        console.log("La base de donnée est bien synchro")
    })
}


module.exports = {
    initDb, User, Posts, Comments, Likes
};