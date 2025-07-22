const ModelCorreo = require('../model/correo_confirmacion');

class CorreoConfirmacion{
    constructor(router){
        router.post("/correo/enviar", this.enviarCorreo.bind(this));
        router.post("/correo/validar", this.validarCodigo.bind(this));
        router.post("/correo/reenviar", this.reenviarCorreo.bind(this));
    }

    async enviarCorreo(req, res){
        const {correo, usuario} = req.body;
        try{
            const resultado = await ModelCorreo.createOne(correo, usuario);
            res.status(200).json(resultado);
        }catch(error){


        }
    }

    async reenviarCorreo(req, res){
        const {correo, usuario} = req.body;
        res.send(await ModelCorreo.reenviarCodigo(correo, usuario))
    }

    async validarCodigo(req, res){
        const {correo, codigo} = req.body;
        res.send(await ModelCorreo.verificar(correo, codigo))
    }
}

module.exports = CorreoConfirmacion;