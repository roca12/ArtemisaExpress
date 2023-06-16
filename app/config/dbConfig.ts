import {Mongoose} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const urlDatabase: string = process.env.DATABASE ?? '';
const configMongoose: {
    mongoose: Mongoose,
    url: string,
} = {
    mongoose: new Mongoose(),
    url: urlDatabase,
};

export {configMongoose};
