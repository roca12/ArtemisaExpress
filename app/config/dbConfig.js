/**
 * Configuración base de Mongoose.
 *
 * Expone el objeto `configMongoose` con la instancia de Mongoose y la URL de
 * conexión leída de la variable de entorno `DATABASE`. Los modelos se registran
 * sobre este objeto en `database/database.js`.
 *
 * @module config/dbConfig
 */
const Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;
const dotenv = require("dotenv");
dotenv.config();

/**
 * @typedef {Object} ConfigMongoose
 * @property {import("mongoose")} mongoose - Instancia de Mongoose.
 * @property {string} url - URI de conexión a MongoDB.
 */

/** @type {ConfigMongoose} */
const configMongoose = {
  mongoose: Mongoose,
  url: process.env.DATABASE,
};

module.exports = {
  configMongoose,
};
