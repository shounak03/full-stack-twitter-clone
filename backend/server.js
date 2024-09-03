import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv'
import connectMongoDB from './db/connectMongoDB.js'

dotenv.config();
const app = express()

app.use("/api/auth",authRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server running at port:${process.env.PORT}`);
    connectMongoDB();
})
