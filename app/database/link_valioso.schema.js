module.exports = (mongoose) => {
    const schema = new mongoose.Schema({
        'nombre': {type: String},
        'url': {type: String},
        'tags': {type: String},
        'icono': {type: String},
    }, {collection: 'link_valioso'});
    return mongoose.model('link_valioso', schema);
}
