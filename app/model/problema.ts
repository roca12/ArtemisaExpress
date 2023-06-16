import {newConfigMongoose} from '../database/database';
import {IProblema} from "../database/problema.schema";

const ProblemaDb = newConfigMongoose.problema;

class Problema {

    public async findAll(): Promise<object> {
        try {
            return {data: await ProblemaDb.find({})};
        } catch (e) {
            throw e;
        }
    }

    public async createProblem(problema: IProblema): Promise<void> {
        try {
            problema && problema.id && problema.titulo && problema.juez && problema.url && problema.alias && await (async () => {
                await new ProblemaDb({
                    'id': problema.id,
                    'titulo': problema.titulo,
                    'juez': problema.juez,
                    'alias': problema.alias,
                    'dificultad': problema.dificultad ?? 0,
                    'tema_1': problema.tema_1,
                    'tema_2': problema.tema_2 ?? '',
                    'tema_3': problema.tema_3 ?? '',
                    'tema_4': problema.tema_4 ?? '',
                    'url': problema.url,
                }).save();
            })()
            return;
        } catch (e) {
            throw e;
        }
    }
}

const problema = new Problema();
export default problema;
