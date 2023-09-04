import { Router } from "express";
import { checkJwtMiddleware } from "../middleware/checkjwt.middleware";
import publicRoutes from "./publicRoutes/publicRequest.routes";
import privateRoutes from "./privateRoutes/privateRequest.routes";

const RequestRouter = Router()

RequestRouter
    .get('/public', publicRoutes)
    .get('/private', checkJwtMiddleware, privateRoutes)

export default RequestRouter;