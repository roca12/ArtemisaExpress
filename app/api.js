'use strict';
const express = require('express');
const path = require('path');
const {configMongoose} = require('./config/dbConfig');
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const logger = require('morgan');

const app = express();
const router = express.Router();
dotenv.config();

app.use(logger(`\u001b[36murl:\u001b[0m :url
\u001b[36mmethod:\u001b[0m :method
\u001b[36mstatus_code:\u001b[0m :status
\u001b[36mtime:\u001b[0m :response-time ms
\u001b[36mdate:\u001b[0m :date[iso]
`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

const initRouter = () => {
    const api = [
        {controller: '/temario', router: require('./controller/temario')},
        {controller: '/problema', router: require('./controller/problema')},
        {controller: '/usuario', router: require('./controller/usuario')}
    ];
    for (const routerController of api) {
        const r = express.Router();
        new routerController.router(r);
        app.use(routerController.controller, r);
    }
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

app.use((req, res, next) => {
    res.status(404);
    res.send({error: 'Not found'});
    next();
});

module.exports = app;
module.exports.handler = serverless(app);
