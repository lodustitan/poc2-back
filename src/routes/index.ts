import { Router } from "express";
import controller from "../controllers/index";
import middleware from "../middlewares/index";

const route = Router();

//* Authentication
route.post("/auth", middleware.auth, controller.auth.auth_session)
route.post("/auth/login", middleware.login, controller.auth.auth_login);
route.post("/auth/register", middleware.register, controller.auth.auth_register);

//* User
route.post("/user/work", middleware.auth, controller.tools.doWork);
route.post("/user/gacha", middleware.auth, controller.tools.doGacha);
route.get("/user/inv", middleware.auth, controller.users.user_getUserIdols);

//* Market
route.get("/market", middleware.getIdols, controller.market.getMarket);
route.post("/market/add/:id", middleware.auth, controller.market.addIdolMarket);
route.post("/market/buy/:id", middleware.auth, controller.market.buyIdolMarket);

//* Tools
route.get("/idols", middleware.getIdols, controller.tools.getAllIdols)

export default route;