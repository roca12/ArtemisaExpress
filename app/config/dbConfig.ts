import {Mongoose} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const urlDatabase: string = process.env.DATABASE ?? '';

interface IConfig {
    mongoose: Mongoose,
    url: string,
}

const configMongoose: IConfig = {
    mongoose: new Mongoose(),
    url: urlDatabase,
};

export {configMongoose};
