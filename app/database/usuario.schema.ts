import {Model} from "mongoose";
import {configMongoose} from "../config/dbConfig";

const mg = configMongoose.mongoose;

interface IUsuario {
    user: string,
    password: string,
    email: string,
    activo: number,
    cod_perfil: number,
    fecha_creacion: Date,
    fecha_modificacion: Date,
}

class UsuarioSchema {
    constructor() {
    }

    public init(): Model<IUsuario> {
        const schema = new mg.Schema<IUsuario>({
            'user': {type: String},
            'password': {type: String},
            'email': {type: String},
            'activo': {type: Number, default: 1},
            'cod_perfil': {type: Number, default: 1},
            'fecha_creacion': {type: Date, default: Date.now()},
            'fecha_modificacion': {type: Date, default: Date.now()},
        }, {collection: 'usuario'});
        return mg.model('usuario', schema);
    }
}

const usuario = new UsuarioSchema();
export default usuario;
export {IUsuario};
