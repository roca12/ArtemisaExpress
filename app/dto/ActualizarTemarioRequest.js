class ActualizarTemarioRequest {
  constructor(body) {
    this.supergrupo = body.supergrupo;
    this.tema = body.tema;
    this.texto = body.texto;
    this.complejidad_tiempo = body.complejidad_tiempo;
    this.java = body.java;
    this.cpp = body.cpp;
    this.py = body.py;
    this.orden = body.orden;
    this.suborden = body.suborden;
    this.fecha_modificacion = body.fecha_modificacion;
  }
}

module.exports = ActualizarTemarioRequest;
