/**
 * Verifica si una cadena es una URL válida con protocolo http o https.
 * @param {string} url - Cadena a validar.
 * @returns {boolean} `true` si la URL es válida, `false` en caso contrario.
 */
function esUrlValida(url) {
  try {
    const urlObject = new URL(url);
    return urlObject.protocol === "http:" || urlObject.protocol === "https:";
  } catch {
    return false;
  }
}
module.exports = { esUrlValida };
