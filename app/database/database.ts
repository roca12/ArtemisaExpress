import {Model, Mongoose} from 'mongoose';
import {configMongoose} from '../config/dbConfig';
import {ITemario, default as temarioModel} from "./temario.schema";
import {IUsuario, default as usuarioModel} from "./usuario.schema";
import {IProblema, default as problemaModel} from "./problema.schema";
import {ILinkValioso, default as linkValiosoModel} from './link_valioso.schema';
import {IRutaComponent, default as rutaComponentModel} from "./ruta_component.schema";

configMongoose.mongoose.Promise = global.Promise;

interface ConfigMongoose {
    mongoose: Mongoose,
    url: string,
    temario: Model<ITemario>,
    link_valioso: Model<ILinkValioso>,
    problema: Model<IProblema>,
    ruta_component: Model<IRutaComponent>
    usuario: Model<IUsuario>
}

const newConfigMongoose: ConfigMongoose = {
    ...configMongoose,
    temario: temarioModel.init(),
    link_valioso: linkValiosoModel.init(),
    problema: problemaModel.init(),
    ruta_component: rutaComponentModel.init(),
    usuario: usuarioModel.init()
}

export {newConfigMongoose};
