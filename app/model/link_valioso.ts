import {newConfigMongoose} from '../database/database';

const LinkValiosoDb = newConfigMongoose.link_valioso;

class LinkValioso {
    constructor() {
    }


    public async findAll() {
        try {
            return {data: await LinkValiosoDb.find({})};
        } catch (e) {
            throw e;
        }
    }
}

const link = new LinkValioso();
export default link;
