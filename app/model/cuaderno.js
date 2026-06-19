const {configMongoose} = require('../database/database');
const Cuaderno = configMongoose.cuaderno;

/**
 * Busca todos los cuadernos pertenecientes a un usuario.
 * @param {string} userId - Identificador del usuario propietario.
 * @returns {Promise<Object[]>} Cuadernos del usuario.
 */
exports.findByUserId = function(userId){
    return Cuaderno.find({userId:userId}).exec();
}
/**
 * Obtiene todos los cuadernos marcados como públicos.
 * @returns {Promise<Object[]>} Cuadernos públicos.
 */
exports.findAllPublic = function(){
    return Cuaderno.find({public:true}).exec();
}
/**
 * Crea y persiste un nuevo cuaderno.
 * @param {Object} data - Datos del cuaderno a crear.
 * @returns {Promise<Object>} Cuaderno creado.
 */
exports.create = function(data){
    return new Cuaderno(data).save();
}
/**
 * Elimina un cuaderno por su ID.
 * @param {Object} params
 * @param {string} params.id - Identificador del cuaderno a eliminar.
 * @returns {Promise<Object|null>} Cuaderno eliminado o null si no existe.
 */
exports.delete = function({id}){
    return Cuaderno.findByIdAndDelete(id);
}
/**
 * Actualiza un cuaderno por su ID.
 * @param {Object} params
 * @param {string} params.id - Identificador del cuaderno a actualizar.
 * @param {Object} params.data - Campos a actualizar.
 * @returns {Promise<Object|null>} Cuaderno antes de la actualización o null si no existe.
 */
exports.update = function({id,data}){
    return Cuaderno.findByIdAndUpdate(id,data);
}

