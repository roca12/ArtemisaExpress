import {configMongoose} from '../config/dbConfig';
import {Model, Mongoose} from 'mongoose';
import linkValiosoModel from './link_valioso.schema';
import temarioModel from './temario.schema';

configMongoose.mongoose.Promise = global.Promise;

interface ConfigMongoose {
    mongoose: Mongoose,
    url: string,
    temario: Model<any>,
    link_valioso: Model<any>,
}

const newConfigMongoose: ConfigMongoose = {
    ...configMongoose,
    temario: temarioModel.init(),
    link_valioso: linkValiosoModel.init(),
}

export {newConfigMongoose};
