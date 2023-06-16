import {Model} from "mongoose";
import {configMongoose} from "../config/dbConfig";

const mg = configMongoose.mongoose;

class LinkValiosoSchema {

    constructor() {
    }

    public init(): Model<any> {
        const schema = new mg.Schema({
            'nombre': {type: String},
            'url': {type: String},
            'tags': {type: String},
            'icono': {type: String},
        }, {collection: 'link_valioso'});
        return mg.model('link_valioso', schema);
    }
}

const linkValioso: LinkValiosoSchema = new LinkValiosoSchema();
export default linkValioso;
