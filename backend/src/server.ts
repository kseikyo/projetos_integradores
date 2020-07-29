import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);