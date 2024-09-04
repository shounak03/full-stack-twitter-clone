import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv'
import connectMongoDB from './db/connectMongoDB.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/auth",authRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server running at port:${process.env.PORT}`);
    connectMongoDB();
})
