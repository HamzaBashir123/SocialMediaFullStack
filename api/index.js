import express from 'express';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import postRoutes from './routes/postRoutes.js';
import helmet from "helmet";

import morgan from "morgan";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express()
const PORT =  8000






app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

app.use((req, res, next)=> {
    req.body.date = new Date()
    console.log(req.body)
    next()
})

app.get('/', (req, res)=>{
    res.send("<h1>Welcome to home page</h1>")

})
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/posts', postRoutes)


app.listen(PORT,async()=> {
    console.log("Server is running " + PORT)
    mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connect to Db")
}).catch((err)=>{
    throw err;
})
})

