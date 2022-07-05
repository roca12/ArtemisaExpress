const {configMongoose} = require('./../config/dbConfig');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
configMongoose.temario = require('./temario.schema')(mongoose);
configMongoose.problema = require('./problema.schema')(mongoose);
configMongoose.usuario = require('./usuario.schema')(mongoose);
module.exports = {
    configMongoose
}
