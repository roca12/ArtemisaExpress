import {Model} from "mongoose";
import {configMongoose} from "../config/dbConfig";

const mg = configMongoose.mongoose;

interface ILinkValioso {
    nombre: string,
    url: string,
    tags: string,
    icono: string,
}

class LinkValiosoSchema {

    constructor() {
    }

    public init(): Model<ILinkValioso> {
        const schema = new mg.Schema<ILinkValioso>({
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
export {ILinkValioso};
