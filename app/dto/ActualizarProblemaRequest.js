class ActualizarProblemaRequest {
  constructor(body) {
    this.titulo = body.titulo;
    this.juez = body.juez;
    this.alias = body.alias;
    this.dificultad = body.dificultad;
    this.tema_1 = body.tema_1;
    this.tema_2 = body.tema_2;
    this.tema_3 = body.tema_3;
    this.tema_4 = body.tema_4;
    this.url = body.url;
  }
}

module.exports = ActualizarProblemaRequest;