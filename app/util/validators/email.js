/**
 * Verifica si una cadena es un correo electrónico válido.
 * @param {string} email - Cadena a validar.
 * @returns {boolean} `true` si el formato es válido, `false` en caso contrario.
 */
function esEmailValido(email) {
  if (typeof email !== "string") return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}
module.exports = { esEmailValido };
