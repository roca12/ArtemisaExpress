'use strict';
const express = require('express');
const path = require('path');
const {configMongoose} = require('./config/dbConfig');
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const router = express.Router();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

const initRouter = () => {
    new (require('./controller/temario'))(router);
    new (require('./controller/problema'))(router);
}

const lambdaFunction = () => {
    app.use(`/.netlify/functions/api`, router);
    app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
}

(function () {
    initRouter();
    const db = configMongoose.mongoose.connection;
    configMongoose.mongoose.connect(configMongoose.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch((err) => console.log(err));
    db.once('open', () => {
        console.log('Database connected');
    });
    lambdaFunction();
})();

module.exports = app;
module.exports.handler = serverless(app);
