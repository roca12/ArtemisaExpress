module.exports = (mongoose) => {
    const schema = new mongoose.Schema({
        'path': {type: String},
        'title': {type: String},
        'icon': {type: String, default: ''},
        'class': {type: String},
        'extralink': {type: Boolean, default: false},
        'submenu': {type: Array, default: []},
        'perfil': {type: Array, default: []},
    }, {collection: 'ruta_component'});
    return mongoose.model('ruta_component', schema);
}
