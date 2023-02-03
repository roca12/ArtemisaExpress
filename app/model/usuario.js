const {configMongoose} = require('../database/database');
const Usuario = configMongoose.usuario;
const RutaComponents = configMongoose.ruta_component;
const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async function (usuario) {
    try {
        let newUser = {};
        usuario.user && usuario.password && usuario.email && await (async () => {
            usuario.password = md5(usuario.password);
            newUser = await new Usuario({
                'user': usuario.user,
                'password': usuario.password,
                'email': usuario.email,
                'activo': usuario.activo ?? 1,
                'cod_perfil': usuario.cod_perfil ?? null,
                'fecha_creacion': new Date().toISOString().slice(0, 19).replace('T', ' '),
                'fecha_modificacion': new Date().toISOString().slice(0, 19).replace('T', ' '),
            }).save();
        })();
        return newUser
    } catch (e) {
        throw e;
    }
}

exports.autenticarUsuario = async function (usuario) {
    try {
        let searchUser = {};
        usuario.user && usuario.password && await (async () => {
            usuario.password = md5(usuario.password);
            searchUser = await Usuario.find({'user': usuario.user, 'password': usuario.password});
            if (searchUser.length) {
                searchUser = searchUser[0];
                searchUser.password = null;
            }
        })();
        return {
            token: jwt.sign({
                data: searchUser
            }, process.env.JWT_KEY, {expiresIn: '1h'})
        };
    } catch (e) {
        throw e;
    }
}
exports.obtenerAccesosPorPerfil = async function (perfil) {
    try {
        return RutaComponents.find({'perfil': perfil});
    } catch (e) {
        throw e;
    }
}
