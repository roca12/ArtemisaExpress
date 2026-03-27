const { configMongoose } = require("../database/database");
const Temario = configMongoose.temario;

exports.findAll = async function () {
  try {
    return { data: await Temario.find({}) };
  } catch (e) {
    throw e;
  }
};

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
