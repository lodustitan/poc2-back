import { Request, Response } from "express";
import services from "../services";

import { newUser } from "../protocols/protocols";
import { StatusCodes } from "http-status-codes";



function random (min: number, max: number)
{
	return Math.round( Math.random() * (max - min) + min );
}

class Auth {
    async auth_register (req: Request, res: Response)
    {
        const { data } = res.locals;
        try {

            const newUserObj = data as newUser;
            const query = await services.createAccount(newUserObj);
            
            if(!query) throw Error("register erro");
            return res.status(StatusCodes.CREATED).send(query);
        } 
        catch (err) 
        {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
    async auth_login (req: Request, res: Response)
    {
        const { data } = res.locals;
        return res.status(200).send(data);
    }
    async auth_session (req: Request, res: Response)
    {
        const { data } = res.locals;
        const query = await services.getByAccountName(data);
        return res.status(StatusCodes.OK).send(query);
    }
}
class Users {

    async user_getUserIdols (req: Request, res: Response)
    {
        const { data } = res.locals;

        try 
        {
            const query = await services.getInventory(data);
            const filterNoMarket = query?.filter( el => el.market === null )
            
            res.status(StatusCodes.OK).send(filterNoMarket);
        } 
        catch (err) 
        {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        } 
    }
}
class Tools  {
    async doWork (req: Request, res: Response) {
        const { data } = res.locals; 

        try{
            const query = await services.doWork(data);

            if(!query){
                return res.sendStatus(StatusCodes.NOT_FOUND);
            }

            return res.status(StatusCodes.OK).send(query);  
        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
    async doGacha (req: Request, res: Response) {
        const { data } = res.locals; 

        try{
            const query = await services.doGacha(data);

            if(!query){
                return res.sendStatus(StatusCodes.NOT_FOUND);
            }

            return res.status(StatusCodes.OK).send(query);  
        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
    async getAllIdols (req: Request, res: Response) {
        try {
            const { data } = res.locals;
        
            const page: number = Number(data.page || 1);
            const idol_id: number = Number(data.idol_id || 0);
            const idol_name: string = String(data.idol_name || "");
            
            const query = await services.getDataIdols(page, idol_id, idol_name);

            return res.status(StatusCodes.OK).send(query);
            
        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
}
class Market {
    async getMarket(req: Request, res: Response){
        try {
            const { data } = res.locals;
        
            const page: number = Number(data.page || 1);
            const idol_id: number = Number(data.idol_id || 0);
            const idol_name: string = String(data.idol_name || "");
            
            const result = await services.getAllMarket(page, idol_id, idol_name);
            
            return res.status(StatusCodes.OK).send(result);
            
        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
    async buyIdolMarket(req: Request, res: Response){

        const { data } = res.locals;
        const id = req.params.id;
        const idNumber: number = Number(id);

        try {
            if(isNaN(idNumber)) throw new Error("ID not is a Number");

            const result = await services.buyMarket(data, idNumber);

            if(result === null) throw new Error("Error on buy idol");
            if(result === false) {
                return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not enough peanuts");
            }
            return res.status(StatusCodes.OK).send(result);

        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
    async addIdolMarket(req: Request, res: Response){

        const { data } = res.locals;
        const id = req.params.id;
        const idNumber: number = Number(id);

        try {
            if(isNaN(idNumber)) throw new Error("ID not is a Number");

            const result = await services.buyMarket(data, idNumber);

            if(result === null) throw new Error("Error on buy idol");
            if(result === false) {
                return res.status(StatusCodes.NOT_ACCEPTABLE).send("Not enough peanuts");
            }
            return res.status(StatusCodes.OK).send(result);

        } catch (err) {
            console.error(err);
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    }
}

const controller = {
    auth: new Auth(),
    users: new Users(),
    tools: new Tools(),
    market: new Market()
};

export default controller;