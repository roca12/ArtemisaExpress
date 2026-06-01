const nodemailer = require("nodemailer");
const templates = require("./emailTemplates");

/**
 * Transportador de correo configurado con Gmail usando credenciales de entorno.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.APP_PASSWORD,
  },
});

/**
 * Envía un correo electrónico con contenido HTML.
 * @param {string} to - Dirección de correo destinataria.
 * @param {string} subject - Asunto del correo.
 * @param {string} htmlContent - Contenido HTML del correo.
 * @returns {Promise<Object>} Información del envío.
 */
exports.sendMail = async function (to, subject, htmlContent) {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: ", info.response);
    return info;
  } catch (error) {
    console.error("Error enviando el correo:", error);
    throw error;
  }
};

/**
 * Envía un correo de verificación con el código generado.
 * @param {string} to - Correo electrónico destinatario.
 * @param {string} username - Nombre del usuario.
 * @param {string} code - Código de verificación.
 * @returns {Promise<Object>} Información del envío.
 */
exports.sendVerificationCode = async function (to, username, code) {
  const htmlContent = templates.mailVerifyTemplate(username, code);
  return await exports.sendMail(to, "Codigo Verificación", htmlContent);
};
