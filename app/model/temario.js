const { configMongoose } = require("../database/database");
const Temario = configMongoose.temario;

/**
 * Obtiene todos los registros del temario.
 * @returns {Promise<{data: Array}>} Objeto con la lista de temarios.
 */
exports.findAll = async function () {
  try {
    return { data: await Temario.find({}) };
  } catch (e) {
    throw e;
  }
};

/**
 * Obtiene los nombres únicos de supergrupos del temario.
 * @returns {Promise<{data: string[]}>} Objeto con la lista de nombres de supergrupos.
 */
exports.supergrupos = async function () {
  try {
    const resultado = await Temario.aggregate([
      {
        $group: {
          _id: "$supergrupo",
        },
      },
    ]);
    const nombres = resultado.map((item) => item._id);
    return { data: nombres };
  } catch (e) {
    throw e;
  }
};
