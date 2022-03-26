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

const app = express();

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




app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL';
    res.status(404).json({ message });
});



module.exports = app;