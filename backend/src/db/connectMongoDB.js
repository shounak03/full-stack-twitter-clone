import mongoose from "mongoose";

const connectMongoDB = async()=>{
    try {
        const  conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to database - ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error while connecting : ${error}`);
        process.exit(1);
    }
}

export default connectMongoDB