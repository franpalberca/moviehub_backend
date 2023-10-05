import express, {Express} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import publicRoutes from './routes/publicRoutes/publicRequest.routes';
// import privateRoutes from './routes/privateRoutes/privateRequest.routes';
import fileUpload from 'express-fileupload';

const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:3000';

const app: Express = express();
const corsOptions = {
	origin: APP_ORIGIN,
};

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './temp'
}))

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
// app.use('/private', privateRoutes);
app.use('/', publicRoutes);

export default app;
