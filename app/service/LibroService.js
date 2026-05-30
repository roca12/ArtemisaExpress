const ModelLibro = require('../model/libro');
class LibroService {
    async obtenerLibros(){
        return ModelLibro.findAll();
    }

    async crearLibro({titlo, archivoPdf, imagen}) {
        if(!titulo) throw new Error("El título es obligatorio");
        if(!titulo) throw new Error("El archivo PDF es obligatorio");
        return ModelLibro.createbook({titlo, archivoPdf, imagen});
    }

    async actualizarLibro(id,{titulo, archivoPdf, imagen}) {
        if(!id) throw new Error("El ido es obligatorio");
        const datos = {};
        if(titulo) datos.titulo = titulo;
        if(archivoPdf) datos.archivoPdf = archivoPdf;
        if(imagen) datos.imagen = imagen;
        return ModelLibro.updatebook({id,datos});
    }
    async eliminarLibro(id){
        if(!id) throw new Error("El ido es obligatorio");
        return ModelLibro.deletebook(id);
    }
}
module.exports = LibroService;