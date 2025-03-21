import 'dotenv/config';
import http from 'http';
import app from './app.js'
import {Server} from 'socket.io';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';
import { generateResult } from './services/ai.service.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//here
var corsOptions = {
    origin: process.env.FRONTENDURL,
    headers: ["Content-Type"],
    //credentials: true 
    methods: ['GET', 'POST', 'OPTIONS','PUT'],

};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      
    next();
});
app.set('trust proxy', true);
//

const port=process.env.PORT || 3000;

const server = http.createServer(app); 
const io =new Server(server,{
    cors:{
        origin:'*'
    }
});

io.use(async (socket,next)=>{
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];

        const projectId=socket.handshake.query.projectId;

        console.log(projectId)
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('Invalid ProjectId'))
        }

        socket.project = await projectModel.findById(projectId);

        if (!token) {
            return next(new Error('Authentication error'))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new Error('Authentication error'))
        }

        socket.user = decoded;
        next();

    } catch(error){
        next(error)
    }
})

io.on('connection', socket => {
    console.log('a user connected')
    socket.roomId= socket.project._id.toString()
    
    socket.join(socket.roomId);
    socket.on('project-message',async data =>{
        console.log(data)

        const message = data.message;

        const aiIsPresentInMessage = message.includes('@ai');
        socket.broadcast.to(socket.roomId).emit('project-message', data)

        if (aiIsPresentInMessage) {

            const prompt = message.replace('@ai', '');

            const result = await generateResult(prompt);
            console.log(result)

            io.to(socket.roomId).emit('project-message', {
                message: result,
                sender: {
                    _id: 'ai',
                    email: 'AI'
                }
            })
            return
        }

        // socket.broadcast.to(socket.roomId).emit('project-message', data);
    });

    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => { /* … */ });
});

server.listen(port,()=>{
    console.log('server is running');

})

