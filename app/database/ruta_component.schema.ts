import {Model, Types} from "mongoose";
import {configMongoose} from "../config/dbConfig";

const mg = configMongoose.mongoose;

interface IRutaComponent {
    path: string,
    title: string,
    icon: string,
    class: string,
    extralink: boolean,
    submenu: Array<string>,
    perfil: Types.Array<number>,
}

class RutaComponentSchema {

    constructor() {
    }

    public init(): Model<IRutaComponent> {
        const schema = new mg.Schema<IRutaComponent>({
            'path': {type: String},
            'title': {type: String},
            'icon': {type: String, default: ''},
            'class': {type: String},
            'extralink': {type: Boolean, default: false},
            'submenu': [String],
            'perfil': [Number],
        }, {collection: 'ruta_component'});
        return mg.model('ruta_component', schema);
    }
}

const rutaComponent = new RutaComponentSchema();
export default rutaComponent;
export {IRutaComponent};
