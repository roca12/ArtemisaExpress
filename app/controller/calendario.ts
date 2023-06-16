import ModelCalendar from '../model/calendario';
import {Router, Request, Response} from 'express';

class Calendario {
    public router: Router = Router();

    constructor() {
        this.router.get('/', this.obtenerInformacionCalendario);
    }

    async obtenerInformacionCalendario(req: Request, res: Response): Promise<void> {
        res.send(await ModelCalendar.obtenerFechasCalendario());
    }
}

const calendar = new Calendario();

export default calendar.router;
