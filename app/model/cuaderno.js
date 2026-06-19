const {configMongoose} = require('../database/database');
const Cuaderno = configMongoose.cuaderno;

exports.findByUserId = function(userId){
    return Cuaderno.find({userId:userId}).exec();
}
exports.findAllPublic = function(){
    return Cuaderno.find({public:true}).exec();
}
exports.create = function(data){
    return new Cuaderno(data).save();
}
exports.delete = function({id}){
    return Cuaderno.findByIdAndDelete(id);
}
exports.update = function({id,data}){
    return Cuaderno.findByIdAndUpdate(id,data);
}

