const { configMongoose } = require("../database/database");
const { sendVerificationCode } = require("../util/mail/email_service");
const { sha256 } = require("../util/crypto/hash");
const CorreoConfirmacion = configMongoose.correo_confirmacion;

exports.verificar = async function (correo, codigo) {
  try {
    let response = {};
    response = await CorreoConfirmacion.findOne({ correo: correo });
    return (
      !response.usado &&
      response.expiraEn > new Date(Date.now()) &&
      response.codigo === sha256(codigo)
    );
  } catch (e) {
    throw e;
  }
};

exports.createOne = async function (correo, nombre) {
  try {
    const codigo = generarCodigo();
    let response = {};
    await (async () => {
      response = await new CorreoConfirmacion({
        correo: correo,
        codigo: sha256(codigo),
        usado: false,
        creadoEn: new Date(Date.now()),
        expiraEn: new Date(Date.now() + 1000 * 60 * 5),
      }).save();
    })();
    await sendVerificationCode(correo, nombre, codigo);
    return { success: true, message: "Código enviado exitosamente" };
  } catch (e) {
    throw e;
  }
};

exports.reenviarCodigo = async function (correo, nombre) {
  try {
    const doc = await CorreoConfirmacion.findOne({ correo: correo });

    doc.codigo = generarCodigo();
    doc.creadoEn = new Date(Date.now());
    doc.expiraEn = new Date(Date.now() + 1000 * 60 * 5);

    await doc.save();

    await sendVerificationCode(correo, nombre, doc.codigo);

    return { success: true, message: "Código reenviado exitosamente" };
  } catch (e) {
    throw e;
  }
};

function generarCodigo() {
  const codigo = [];
  for (let i = 0; i < 4; i++) {
    const tipo = Math.random() < 0.5 ? "letra" : "numero";
    if (tipo === "letra") {
      const letra = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      codigo.push(letra);
    } else {
      const numero = String.fromCharCode(Math.floor(Math.random() * 10) + 48);
      codigo.push(numero);
    }
  }
  console.log(codigo);
  return codigo.join("");
}
