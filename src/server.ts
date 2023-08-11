import express, { Express } from "express";
import morgan from 'morgan';
import cors from 'cors';
import RequestRouter from "./routes/request.routes";

const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:5173'

const app: Express = express();
const corsOptions = {
    origin: APP_ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", RequestRouter)

export default app;
