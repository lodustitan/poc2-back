import Schemas from "../schemas/model";
import services from "../services/index";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

import { Request, Response, NextFunction } from "express";

class Middleware {
    async getIdols(req: Request, res: Response, next: NextFunction) {
        
        const body = req.query;
        const verify = Schemas.getIdol.validate(body, {abortEarly: false});

        if(verify.error){
            const details = verify.error.details.map(details => details.message);
            return res.status(StatusCodes.BAD_REQUEST).send(details);
        }
        
        res.locals.data = body;
        return next();
    }
    async register(req: Request, res: Response, next: NextFunction) {
        
        const body = req.body;
        const verify = Schemas.user_register.validate(body, {abortEarly: false});

        if(verify.error){
            const details = verify.error.details.map(details => details.message);
            return res.status(400).send(details);
        }

        const verify_exist = await services.getByAccountName(body.account_name);
        
        if(!verify_exist){
            res.locals.data = body;
            return next();
        }

        return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    async login(req: Request, res: Response, next: NextFunction) {

        const body = req.body;
        const verify = Schemas.user_login.validate(body, {abortEarly: false});

        if(verify.error) {
            const details = verify.error.details.map(details => details.message);
            return res.status(StatusCodes.BAD_REQUEST).send(details);
        }

        const verify_exist = await services.getByAccountName(body.account_name);
        
        if(verify_exist){
            const hashComparison = await bcrypt.compare(body.password, verify_exist.password)
            if(!hashComparison) return res.status(StatusCodes.NOT_FOUND).send("wrong account or password");
            else {
                res.locals.data = verify_exist;
                return next();
            } 
        }
        return res.sendStatus(StatusCodes.NOT_FOUND);

    }
    async auth(req: Request, res: Response, next: NextFunction) {
        
        const account_name = req.headers.account_name as string;
        console.log(req.headers.account_name);
        const verify = Schemas.authentication.validate({account_name}, {abortEarly: false});

        if(verify.error) return res.status(StatusCodes.BAD_REQUEST).send(verify.error.details.map(details => details.message));

        if(account_name){
            const query = await services.getByAccountName(account_name);
            if(!query) return res.sendStatus(StatusCodes.NOT_FOUND);
            else {
                res.locals.data = account_name;
                return next();
            }
        }

        return res.sendStatus(StatusCodes.NOT_FOUND);
    }
}

const middleware = new Middleware();

export default middleware;