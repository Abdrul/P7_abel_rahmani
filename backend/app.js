const express = require('express');
const morgan = require('morgan');
const sequelize = require('./config/db');

const userRoutes = require('./routes/userRoute');
const postsRoutes = require('./routes/postsRoute');

const app = express();

app
    .use(morgan("dev"))
    .use(express.json());

sequelize.initDb();

app.use('/api/auth', userRoutes);
// app.get('/ok', (req,res) => {
//     res.send('ok')
// })

app.use('/api/posts', postsRoutes);


app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL';
    res.status(404).json({ message });
});


module.exports = app;