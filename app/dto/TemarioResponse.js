/**
 * DTO de respuesta con los datos de un tema del temario.
 */
class TemarioResponse {
  /**
   * @param {Object} body - Documento del tema.
   * @param {string} body._id - Identificador del tema (necesario para editar/eliminar).
   * @param {string} body.supergrupo - Supergrupo al que pertenece el tema.
   * @param {string} body.tema - Nombre del tema.
   * @param {string} body.texto - Contenido o descripción del tema.
   * @param {string} body.complejidad_tiempo - Complejidad temporal asociada.
   * @param {string} body.java - Snippet o referencia en Java.
   * @param {string} body.cpp - Snippet o referencia en C++.
   * @param {string} body.py - Snippet o referencia en Python.
   * @param {number} body.orden - Orden del tema.
   * @param {number} body.suborden - Suborden del tema.
   * @param {string} body.fecha_creacion - Fecha de creación.
   * @param {string} body.fecha_modificacion - Fecha de modificación.
   */
  constructor(body) {
    this._id = body._id;
    this.supergrupo = body.supergrupo;
    this.tema = body.tema;
    this.texto = body.texto;
    this.complejidad_tiempo = body.complejidad_tiempo;
    this.java = body.java;
    this.cpp = body.cpp;
    this.py = body.py;
    this.orden = body.orden;
    this.suborden = body.suborden;
    this.fecha_creacion = body.fecha_creacion;
    this.fecha_modificacion = body.fecha_modificacion;
  }
}

module.exports = TemarioResponse;
