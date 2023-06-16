import {Model} from "mongoose";
import {configMongoose} from "../config/dbConfig";

const mg = configMongoose.mongoose;

interface IProblema {
    id: number,
    titulo: string,
    juez: string,
    alias: number,
    dificultad: number,
    tema_1: string,
    tema_2: string,
    tema_3: string,
    tema_4: string,
    url: string,
}

class ProblemaSchema {
    public init(): Model<IProblema> {
        const schema = new mg.Schema<IProblema>({
            'id': {type: Number},
            'titulo': {type: String},
            'juez': {type: String},
            'alias': {type: Number},
            'dificultad': {type: Number},
            'tema_1': {type: String},
            'tema_2': {type: String},
            'tema_3': {type: String},
            'tema_4': {type: String},
            'url': {type: String},
        }, {collection: 'Problemas'});
        return mg.model('Problemas', schema);
    }
}

const problema = new ProblemaSchema();
export default problema;
export {IProblema}
