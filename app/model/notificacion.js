const { configMongoose } = require("../database/database");
const Notificacion = configMongoose.notificacion;

exports.createOne = async function (data) {
  return new Notificacion(data).save();
};

exports.findOne = async function (destino, plantilla) {
  return new Notificacion.findOne(destino, plantilla);
};

exports.updateOne = async function (destino, plantilla, datos) {
  return Notificacion.findOneAndUpdate(
    { destino, plantilla },
    { datos },
    { new: true, sort: { creadoEn: -1 } },
  );
};

exports.marcarEnviado = async function (id) {
  return Notificacion.findByIdAndUpdate(id, { enviado: true }, { new: true });
};
