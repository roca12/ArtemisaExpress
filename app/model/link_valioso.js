const { configMongoose } = require("../database/database");
const LinkValioso = configMongoose.link_valioso;

exports.findAll = async function () {
  try {
    return { data: await LinkValioso.find({}) };
  } catch (e) {
    throw e;
  }
};
