/**
 * Registro central de modelos de Mongoose.
 *
 * Inicializa cada esquema y lo adjunta al objeto `configMongoose`, de modo que
 * los modelos quedan accesibles (p. ej. `configMongoose.usuario`) desde la capa
 * de modelos.
 *
 * @module database/database
 */
const { configMongoose } = require("./../config/dbConfig");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
configMongoose.temario = require("./temario.schema")(mongoose);
configMongoose.problema = require("./problema.schema")(mongoose);
configMongoose.usuario = require("./usuario.schema")(mongoose);
configMongoose.ruta_component = require("./ruta_component.schema")(mongoose);
configMongoose.link_valioso = require("./link_valioso.schema")(mongoose);
configMongoose.libro = require("./libro.schema")(mongoose);
configMongoose.notificacion = require("./notificacion.schema")(mongoose);
configMongoose.cuaderno = require("./cuaderno.schema")(mongoose);
module.exports = {
  configMongoose,
};
