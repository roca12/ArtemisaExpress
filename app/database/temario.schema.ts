import {Model} from "mongoose";
import {configMongoose} from "../config/dbConfig";

const mg = configMongoose.mongoose;

class TemarioSchema {
    constructor() {
    }

    init(): Model<any> {
        const schema = new mg.Schema({
            'ID': {type: Number},
            'supergrupo': {type: String},
            'tema': {type: String},
            'texto': {type: String},
            'complejidad_tiempo': {type: String, default: null},
            'java': {type: String, default: null},
            'cpp': {type: String, default: null},
            'py': {type: String, default: null},
            'orden': {type: Number},
            'suborden': {type: Number},
            'fecha_creacion': {type: String},
            'fecha_modificacion': {type: String}
        }, {collection: 'temario'});
        return mg.model('temario', schema);
    }
}

const temarioSchema = new TemarioSchema();

export default temarioSchema;
