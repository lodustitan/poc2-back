import repository from "../repositories/repository";
import { newUser } from "../protocols/protocols";
import data from "../assets/idols.json";
import bcrypt from "bcrypt";

class Services {
    async getDataIdols(page: number, idol_id: number, idol_name: string) {
        const pageLimit = 15;
        const pageOffset = page || 1;

        let filtered = [...data.idols];

        if(idol_id !== 0){
            filtered = filtered.filter(el => el.idol_id === idol_id);
        }
        if(idol_name !== ""){
            filtered = filtered.filter(el => (el.name.toLowerCase()).includes(idol_name.toLowerCase()));
        }
        
        const arrPage = filtered.splice((pageOffset-1)*pageLimit, pageOffset*pageLimit); 
        return arrPage;
    }
    async createAccount(user: newUser){
        try{

            const hashPassword = await bcrypt.hash(user.password, 10);
            user.password = hashPassword;
            const verify_exist = await repository.user_create(user);  

            return true;
        } catch (err) {
            return null;
        }
    }
    async getInventory(account_name: string){
        try{
            const account = await this.getByAccountName(account_name);
            if(account) {
                
                const query = await repository.idol_getAllIdols(account.id);

                if(query.result){ return query.result }
            }
            else throw new Error();
        } catch (err) {
            return null;
        }
    }
    async getByAccountName(account_name: string){
        try{
            const verify_exist = await repository.user_getByAccountName(account_name);
            if(verify_exist.status) {
                return verify_exist.result;
            } else {
                throw new Error();
            }
        } catch (err) {
            return null;
        }
    }
    async addCashById(account_name: string, value: number){
        try{
            if(value < 0) return null;

            const account = await this.getByAccountName(account_name);
            if(account) {
                const query = await repository.user_setCashById(account.id, account.peanuts + value)
                if(query.result){
                    return query.result
                }
            }
            else {            
                throw new Error();
            }
        } catch (err) {
            return null;
        }
    }
    async removeCashById(account_name: string, value: number){
        try{
            if(value < 0) return null;

            const account = await this.getByAccountName(account_name);
            if(account) {
                const query = await repository.user_setCashById(account.id, account.peanuts - value)
                if(query.result){
                    return query.result
                }
            }
            else { 
                throw new Error();
            }
        } catch (err) {
            return null;
        }
    }
    async doGacha(account_name: string){
        try {
            const account = await this.getByAccountName(account_name);
            if(account) {
                
                const random_idol = data.idols[Math.floor(Math.random() * data.idols.length)]
                const query = await repository.idol_create(random_idol.name, random_idol.image_url, random_idol.type, account.id, random_idol.rarity)
                await repository.user_setCashById(account.id, account.peanuts - 100)
                
                if(query.result){
                    return query.result
                }
            }
            throw new Error();
        } catch (err) {
            return null;
        }
    }
    async doWork(account_name: string){
        try {
            const account = await this.getByAccountName(account_name);
            if(account) {
                
                await this.addCashById(account.account_name, 100);
                return true;
            }
            throw new Error();
        } catch (err) {
            return null;
        }
    }
    async getAllMarket(page: number, idol_id: number, idol_name: string) {
        try {
            const query = await repository.market_getAll(page, idol_id, idol_name);
            return query;
                
        } catch (err) {
            return null
        }
    }
    async buyMarket(account_name:string, id: number) {
        try {
            
            const account = await this.getByAccountName(account_name);
            if(account) {
                const idolMarket = await repository.market_getByMarketID(id);
                
                if(idolMarket.result){
                    if(idolMarket.result.idol_id && account.peanuts >= idolMarket.result.price){
                        await repository.idol_changeOwner(idolMarket.result.idol_id, account.id);
                        await this.removeCashById(account.account_name, idolMarket.result.price);
                        return true;
                    } 
                }
                return false;
            }
            throw new Error();
        } catch (err) {
            return null
        }
    }
    async sellMarket(account_name:string, id: number, price: number) {
        try {
            
            const account = await this.getByAccountName(account_name);
            if(account) {
                const idolMarket = await repository.market_getByMarketID(id);
                
                if(!idolMarket.result){
                    await repository.market_addToMarket(account.id, id, price);
                    return true;
                }
                return false;
            }
            throw new Error();
        } catch (err) {
            return null
        }
    }
}

const services = new Services();

export default services;