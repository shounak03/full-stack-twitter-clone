import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js"

export const getNotification = async(req,res)=>{
    try {
        const userId = req.user._id;
        const notification = await Notification.find({ to: userId}).populate({
            path:"from",
            select:"username profileImg"
        })

        await Notification.updateMany({to:userId},{read:true})
        return res.status(200).json(notification)
    } catch (error) {
        throw new ApiError(error?.message || "Something went wrong", 400)
    }
}

export const delNotification = async(req,res)=>{
    try {
        await Notification.deleteMany({to:req.user._id})
        res.status(200).json({message:"notification deleted"})
    } catch (error) {
        throw new ApiError(400,error?.message || "Something went wrong")
    }
}

        