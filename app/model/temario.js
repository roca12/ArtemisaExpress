const { configMongoose } = require("../database/database");
const Temario = configMongoose.temario;


/**
 * Obtiene todos los registros del temario.
 * @returns {Promise<{data: Array}>} Objeto con la lista de temarios.
 */
exports.findAll = function () {
  return Temario.find({});
};

/**
 * Obtiene los nombres únicos de supergrupos del temario.
 * @returns {Promise<{data: string[]}>} Objeto con la lista de nombres de supergrupos.
 */
exports.supergrupos = function () {
  const resultado = Temario.aggregate([
    {
      $group: {
        _id: "$supergrupo",
      },
    },
  ]);
  return resultado.map((item) => item._id);
};

exports.crearTemario = function (data) {
  return new Temario(data).save();
};
