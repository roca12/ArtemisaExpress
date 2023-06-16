import {Request, Response, Router} from "express";

import {default as ModelLinkValioso} from './../model/link_valioso';

class LinkValioso {
    public router: Router = Router();

    constructor() {
        this.router.get('/', this.obtenerLinksValiosos);
    }

    async obtenerLinksValiosos(req: Request, res: Response): Promise<void> {
        res.send(await ModelLinkValioso.findAll());
    }
}

const linkValioso = new LinkValioso();

export default linkValioso.router;
