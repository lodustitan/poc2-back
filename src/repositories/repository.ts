import prisma from "../database/database";

import { newUser } from "../protocols/protocols";

class Repository {
    async market_getAll (page: number, idol_id: number, idol_name: string) {
        try {
            let query;
            if(idol_id){
                query = await prisma.market.findMany({
                    where: {idol_id},
                    include:{
                        idols: true
                    },
                    skip: (page-1)*10,
                    take: 10,
                })
            }else if(idol_name){
                query = await prisma.market.findMany({
                    include:{
                        idols: true
                    },
                    skip: (page-1)*10,
                    take: 10,
                })
            }
            return {status: true, result: query};
        } catch (err) { return {status: false, result: null}
        } finally { await prisma.$disconnect() }
    }
    async market_getByMarketID (market_id: number) {
        try {
            const query = await prisma.market.findFirst({where: {id: market_id}})
            return {status: true, result: query};
        } catch (err) { return {status: false, result: null}
        } finally { await prisma.$disconnect() }
    }
    async market_addToMarket (owner_id: number, idol_id: number, price: number) {
        try {
            const query = await prisma.market.create({
                data: {owner_id, idol_id, price}
              })
            return {status: true, result: query};
        } catch (err) { return {status: false, result: null}
        } finally { await prisma.$disconnect() }
    }
    async market_removeMarket (id: number) {
        try {
            const query = await prisma.market.delete({where: {id}})
            return {status: true, result: null};
        } catch (err) { return {status: false, result: null}
        } finally { await prisma.$disconnect() }
    }
    async user_create (user: newUser)  {
        try {

            const query = await prisma.users.create({data: user});
            return {status: true, result: query};

        } catch (err){ return {status: false, result: null};   
        } finally { await prisma.$disconnect() }
    }
    async user_deleteById (id: number) {
        try {

            const query = await prisma.users.delete({where: {id}});
            return {status: true, result: query};   

        } catch (err) { return {status: false, result: null}; 
        } finally { await prisma.$disconnect() }
    }
    async user_getAll () {
        try {

            const query = await prisma.users.findMany({select: {nickname: true}}); 
            return {status: true, result: query};

        } catch (err) { return {status: false, result: null};
        } finally { await prisma.$disconnect() }
    }
    async user_getByAccountName (account_name: string) {
        try {
            
            const query = await prisma.users.findFirst({where: {account_name}});
            return { status: true, result: query };

        } catch (err) { return { status: false, result: null };
        } finally { await prisma.$disconnect() }
    }
    async user_getById (id: number) {
        try {

            const query = await prisma.users.findFirst({where: {id}})
            return {status: true, result: query};    
        
        } catch (err) { return {status: false, result: null};
        } finally { await prisma.$disconnect() }
    }
    async user_getByNickname (name: string) {
        try {
            
            const query = await prisma.users.findFirst({where: {nickname: name}});
            return {status: true, result: query};  

        } catch (err) { return {status: false, result: null};
        } finally { await prisma.$disconnect() }
    }
    async user_setCashById (id: number, value: number) {
        try {

            const query = await prisma.users.update({data: {peanuts: value}, where: {id}});
            return {status: true, result: query};  

        } catch (err) { return {status: false, result: null};
        } finally { await prisma.$disconnect() }
    }
    async idol_changeOwner (idol_id: number, new_owner: number) {
        try {

            const query = await prisma.idols.update({where: {id: idol_id} , data: {user_id: new_owner}}); 
            return {status: true, result: query};    
        
        } catch (err) { return {status: false, result: null};
        } finally { await prisma.$disconnect() }
    }
    async idol_create (name: string, image_url: string, type: string, user_id: number, rarity: number) {
        try {

            const query = await prisma.idols.create({data: {name, image_url, type, rarity, user_id}}); 
            return {status: true, result: query};    
        
        } catch (err) { return {status: false, result: null};
        } finally { await prisma.$disconnect() }
    }
    async idol_deleteById (id: number) {
        try {

            const query = await prisma.idols.delete({where: {id}}); 
            return {status: true, result: query};    
        
        } catch (err) {return {status: false, result: null};
        } finally { await prisma.$disconnect() }
    }
    async idol_getAllIdols (user_id: number) {
        try 
        {
            const query = await prisma.idols.findMany({where: {user_id: user_id}, include: { market: true}});
            return {status: true, result: query};

        } catch (err) {return {status: false, result: null};
        } finally { await prisma.$disconnect() }
    }
}

const repository =  new Repository(); 

export default repository;