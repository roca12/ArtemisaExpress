const { configMongoose } = require("../database/database");
const Temario = configMongoose.temario;

/**
 * Obtiene todos los registros del temario.
 * @returns {Promise<{data: Array}>} Objeto con la lista de temarios.
 */
exports.findAll = async function () {
  return  await Temario.findAll();
};

/**
 * Obtiene los nombres únicos de supergrupos del temario.
 * @returns {Promise<{data: string[]}>} Objeto con la lista de nombres de supergrupos.
 */
exports.supergrupos = async function () {
    const resultado = await Temario.aggregate([
      {
        $group: {
          _id: "$supergrupo",
        },
      },
    ]);
    return resultado.map((item) => item._id);
};
