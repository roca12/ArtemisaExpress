/**
 * Verifica si una cadena es una URL válida con protocolo http o https.
 * @param {string} url - Cadena a validar.
 * @returns {boolean} `true` si la URL es válida, `false` en caso contrario.
 */
function esUrlValida(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
module.exports = { esUrlValida };
