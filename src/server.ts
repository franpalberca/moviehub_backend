import express, { Express } from "express";
import morgan from 'morgan';
import UserRouter from './routes/user.routes';
import MoviesRouter from "./routes/movies.routes";

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/movies", MoviesRouter);
app.use("/users", UserRouter);

export default app;
