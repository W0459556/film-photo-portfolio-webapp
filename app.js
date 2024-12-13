import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import photosRouter from './routes/photos.js';
import checkMarcoPolo from './middleware/checkMarcoPolo.js';

dotenv.config();

mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));

app.use('/', indexRouter);
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/photos', photosRouter);

app.use(checkMarcoPolo);


app.use((req, res, next) => {
  next(createError(404));
});


app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;
