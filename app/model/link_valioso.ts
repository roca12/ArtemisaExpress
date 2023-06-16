import {newConfigMongoose} from '../database/database';

const LinkValioso = newConfigMongoose.link_valioso;

exports.findAll = async function () {
    try {
        return {data: await LinkValioso.find({})};
    } catch (e) {
        throw e;
    }
}
