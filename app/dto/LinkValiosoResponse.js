class LinkValiosoResponse {
  constructor(body) {
    this.nombre = body.nombre;
    this.url = body.url;
    this.tags = body.tags;
    this.icono = body.icono;
  }
}

module.exports = LinkValiosoResponse;