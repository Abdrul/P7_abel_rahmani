const express = require('express');
const morgan = require('morgan');
const sequelize = require('./config/db');

const app = express();
const port = 3000;

app
    .use(morgan("dev"))
    .use(express.json());

sequelize.initDb();


app.listen(port, () => console.log(`Connection success on port ${port}`));