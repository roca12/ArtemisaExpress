const {configMongoose} = require('../database/database');
const Problema = configMongoose.problema;

exports.findAll = async function () {
    try {
        return {data: await Problema.find({})};
    } catch (e) {
        throw e;
    }
}

exports.crearProblema = async function (problema) {
    try {
        let response = {};
        problema && problema.id && problema.titulo && problema.juez && problema.url && problema.alias && await (async () => {
            response = await new Problema({
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
        return response;
    } catch (e) {
        throw e;
    }
}
