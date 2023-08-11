import { Router } from "express";
import { checkJwtMiddleware } from "../middleware/checkjwt.middleware";
import { privateRequest, publicRequest } from ".";

const RequestRouter = Router()

RequestRouter
    .get('/public', publicRequest)
    .get('/private', checkJwtMiddleware, privateRequest)

export default RequestRouter;