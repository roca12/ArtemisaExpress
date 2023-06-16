import {Request, Response, Router} from "express";
import {IProblema} from "../database/problema.schema";
import {default as ModelProblem} from './../model/problema';

class Problem {
    public router: Router = Router();

    constructor() {
        this.router.get('/', this.getProblems);
        this.router.post('/', this.createProblem);
    }

    async getProblems(req: Request, res: Response): Promise<void> {
        res.send(await ModelProblem.findAll());
    }

    async createProblem(req: Request, res: Response): Promise<void> {
        const problema: IProblema = req.body;
        res.send(await ModelProblem.createProblem(problema));
    }

}

const problem = new Problem();

export default problem.router;
