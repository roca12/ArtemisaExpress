const ModelLibro = require('../model/libro');

class Libro{
    constructor(router){
        router.get("/libro/", this.obtenerLibros.bind(this))
        router.post("/libro/crear", this.crearLibro.bind(this))
    }

     async obtenerLibros(req, res){
        res.send(await ModelLibro.findAll());
    }

     async crearLibro(req, res){
        const libro = req.body;
        res.send(await ModelLibro.createbook(libro));
    }
}

module.exports = Libro;