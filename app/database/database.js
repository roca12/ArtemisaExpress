const {configMongoose} = require('./../config/dbConfig');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
configMongoose.temario = require('./temario.schema')(mongoose);
configMongoose.problema = require('./problema.schema')(mongoose);
configMongoose.usuario = require('./usuario.schema')(mongoose);
configMongoose.ruta_component = require('./ruta_component.schema')(mongoose);
configMongoose.link_valioso = require('./link_valioso.schema')(mongoose);
module.exports = {
    configMongoose
}
