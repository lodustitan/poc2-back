import prisma from "../src/database/database"

async function main ()  {
    let idols = await prisma.idols.findFirst();
    if(!idols){
        await prisma.idols.createMany({
            data: [
                {
                    id: 1, name: "Cheshire - Yuna", type: "normal", user_id: 1, 
                    image_url: "https://lv2-cdn.azureedge.net/itzy/da89ca75846f4458a074cee166a70c6f-ITZY-CHESHIRE-teaser-%EC%9C%A0%EB%82%98.jpg"
                },
                {
                    id: 2, name: "Checkmate - Lia", type: "normal", user_id: 1, 
                    image_url: "https://lv2-cdn.azureedge.net/itzy/27288c5b759d4e4aa5a4dcd8d32467a1-ITZY_CHECKMATE_%ED%8B%B0%EC%A0%80%EC%9D%B4%EB%AF%B8%EC%A7%80%232_%EB%A6%AC%EC%95%84.jpg"
                },
                {
                    id: 3, name: "Checkmate - Chaeryeong", type: "normal", user_id: 1, 
                    image_url: "https://lv2-cdn.azureedge.net/itzy/5cd2ae5e1a6e4b3091c131b66a9a3612-ITZY_CHECKMATE_%ED%8B%B0%EC%A0%80%EC%9D%B4%EB%AF%B8%EC%A7%80%232_%EC%9C%A0%EB%82%98.jpg"
                },
                {
                    id: 4, name: "Cheshire - Yeji", type: "normal", user_id: 1, 
                    image_url: "https://lv2-cdn.azureedge.net/itzy/2d1556ccc9094dd488b5ab8470c80e32-ITZY-CHESHIRE-teaser-%EC%98%88%EC%A7%80.jpg"
                },
                {
                    id: 5, name: "Cheshire - Yeji", type: "normal", user_id: 1, 
                    image_url: "https://lv2-cdn.azureedge.net/itzy/2d1556ccc9094dd488b5ab8470c80e32-ITZY-CHESHIRE-teaser-%EC%98%88%EC%A7%80.jpg"
                },
            ]
        })
    }
    
    let market = await prisma.market.findFirst();
    if(!market){
        await prisma.market.createMany({
            data: [
                {id: 1, idol_id: 4, price: 5200, owner_id: 2},
                {id: 2, idol_id: 1, price: 2000, owner_id: 2},
            ]
        })
    }

    let users = await prisma.users.findFirst();
    if(!users){
        await prisma.users.createMany({
            data: [
                {
                    id: 1, account_name: "lodus", password: "$2b$10$yhqMnmeW7nLWXFQgfTMUo.RZ/jAeDzCq77bX/6LHfoENC5v7DfRiq",
                    diamonds: 0, peanuts: 1700, nickname: "BlackLotus"
                },
                {
                    id: 2, account_name: "lodusmaker", password: "$2b$10$yhqMnmeW7nLWXFQgfTMUo.RZ/jAeDzCq77bX/6LHfoENC5v7DfRiq", 
                    diamonds: 800, peanuts: 49700, nickname: "titanico"
                }
            ]
        })
    }

    return console.log({ idols, market, users });
}

main()
    .catch( err => console.error(err) )
    .finally( async () =>  await prisma.$disconnect() )