
import mongoose, { Schema } from "mongoose";
const notiSchema = new Schema({

    from:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true 
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true 
    },
    type:{
        type:String,
        required:true,
        enum:['like','follow'] //think of adding comments too
    },
    read:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Notification = mongoose.model("Notification",notiSchema)