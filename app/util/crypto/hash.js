const bcrypt = require("bcrypt");

/**
 * Genera el hash bcrypt de una contraseña.
 * @param {string} password - Contraseña en texto plano.
 * @returns {string} Hash de la contraseña.
 */
exports.hashPassword = function (password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
