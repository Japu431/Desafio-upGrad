require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./router/routes.js');
const bodyParser = require('body-parser');


app.use(bodyParser.json())
app.use('/', routes);

const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME;
const DB_PASSOWORD = process.env.DB_PASSOWORD;

mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASSOWORD}@bookdirectory.rvkqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(res => {
        console.log(`Database connected!!`);
    }).catch(err => {
        console.log(err);
    })

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`)
})