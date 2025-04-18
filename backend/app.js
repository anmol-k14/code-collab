import morgan from 'morgan';
import express from 'express';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/projects.routes.js'
import cookieParser from 'cookie-parser';
import aiRoutes from './routes/ai.routes.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

connect();


const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/projects',projectRoutes);
app.use('/ai',aiRoutes)

app.get('/', (req,res)=>{
    res.send('hello')
})



export default app;