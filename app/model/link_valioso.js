const { configMongoose } = require("../database/database");
const LinkValioso = configMongoose.link_valioso;

exports.findAll = async function () {
    return LinkValioso.find({});
};

exports.updateOne = async function ({id, datos}){
  return LinkValioso.findOneAndUpdate({_id:id}, datos, {new: true});
}

exports.deleteOne = async function (id) {
  return LinkValioso.findOneAndDelete({_id:id});
}

exports.create = async function (data) {
  return new LinkValioso(data).save();
}
