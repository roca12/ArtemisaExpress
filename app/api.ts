'use strict';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import dotenv from 'dotenv';
import winston from 'winston';
import {Connection, ConnectOptions} from "mongoose";
import bodyParser from 'body-parser';
import serverless from 'serverless-http';
import {configMongoose} from './config/dbConfig';
import express, {Express, json, Router, urlencoded} from 'express';
import calendar from './controller/calendario';
import linkValioso from './controller/link_valioso';
import problem from './controller/problema';

dotenv.config();

const corsList: string = process.env.CORS ?? '';
const port: number = +(process.env.PORT ?? 3000);


class Api {

    app: Express;
    router: Router;

    constructor() {
        this.app = express();
        this.router = Router();
    }

    routes(): void {
        this.router.use('/calendario', calendar);
        this.router.use('/link-valioso', linkValioso);
        this.router.use('/problema', problem);
        this.app.use(this.router);
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(404);
            res.send({error: 'Not found'});
            next();
        });
    }

    lambdaFunction(): void {
        this.app.use(`/.netlify/functions/api`, this.router);
        this.app.use('/', (req: express.Request, res: express.Response) => res.sendFile(path.join(__dirname, '../../index.html')));
    }

    config(): void {
        this.app.use(logger(`\u001b[36murl:\u001b[0m :url
            \u001b[36mmethod:\u001b[0m :method
            \u001b[36mstatus_code:\u001b[0m :status
            \u001b[36mtime:\u001b[0m :response-time ms
            \u001b[36mdate:\u001b[0m :date[iso]
        `));

        this.app.use(json());
        this.app.use(bodyParser.json());
        this.app.use(urlencoded({extended: true}));
        this.app.use(cors({
            origin: corsList.toString().split(','),
        }));
    }

    connectDatabase(): void {
        const db: Connection = configMongoose.mongoose.connection;
        configMongoose.mongoose
            .connect(configMongoose.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions)
            .catch((err: Error) => {
                winston.error(err);
            });
        db.once('open', () => {
            console.log('Database connected');
        });
    }

    init(): void {
        this.config();
        this.routes();
        this.connectDatabase();
        this.lambdaFunction();
    }

    listen() {
        this.app.listen(port, function (): void {
            winston.info(`app listening in port ${port}`);
        });
    }
}

const app: Api = new Api();
app.init();

module.exports.handler = serverless(app);
export default app;
