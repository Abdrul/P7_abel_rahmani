const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db');
const path = require('path');

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/usersRoute');
const postsRoutes = require('./routes/postsRoute');
const commentsRoutes = require('./routes/commentsRoute');
const likeRoutes = require('./routes/likesRoute');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app
    .use(morgan("dev"))
    .use(express.json())
    .use(cookieParser());

sequelize.initDb();



app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRoutes);

app.use('/api/posts', postsRoutes);

app.use('/api/comments', commentsRoutes);

app.use('/api/user', userRoutes);

app.use('/api', likeRoutes);




app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL';
    res.status(404).json({ message });
});



module.exports = app;