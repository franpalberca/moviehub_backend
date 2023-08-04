import express, { Express } from "express";
import morgan from 'morgan';
import cors from 'cors';
import UserRouter from './routes/user.routes';
import MoviesRouter from "./routes/movies.routes";
import GenreRouter from "./routes/genre.routes";

const app: Express = express();
const corsOptions = {
    origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));


app.use("/movies", MoviesRouter);
app.use("/users", UserRouter);
app.use("/genres", GenreRouter)

export default app;
