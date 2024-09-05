import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({username}).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(new ApiResponse(200, user, "user-fetched-successfully"));
  } catch (error) {
    console.log("Error while fetching user:", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const followUnfollowUser = async (req, res) => {


  try {
    const {id} = req.params;
    const userToModify = await User.findById(id);
    const currUser = await User.findById(req.user._id);

    if(id==req.user._id){
        return res.status(400).json({error:"You cannot follow yourself"});
    }
    if(!userToModify || !currUser){
        return res.status(404).json({error:"User not found"});
    }
    const isFollowing = currUser.following.includes(id)

    if(isFollowing){
        await User.findByIdAndUpdate(id,{
            $pull:{followers:req.user._id}
        })
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{following:id}
        })
        res.status(401).json({message:"User Unfollowed Successfully"});
    }else{
        await User.findByIdAndUpdate(id,{
            $push:{followers:req.user._id}
        })
        await User.findByIdAndUpdate(req.user._id,{
            $push:{following:id}
        })
        res.status(401).json({message:"User followed Successfully"});

        const newNotification = new Notification({
            type:"follow",
            from:req.user._id,
            to:userToModify._id
        })
        await newNotification.save();
    }


  } catch (error) {
    console.log("Error while fetching user:", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id

        const userFollowedByMe = await User.findById(userId).select("following")

        const users = await User.aggregate([
            {
                $match: {
                    _id:{$ne: userId} // excluding ourself
                }
            },
            {$sample:{size:10}} 
        ]);
        // the above function gives us 10 random user from our database, excluding the current user.
        const filteredUsers = users.filter((user)=>!userFollowedByMe.following.includes(user._id))
        const suggestedUsers = filteredUsers.slice(0,4);
        suggestedUsers.forEach((user)=>(user.password = null))

        res.status(200).json(new ApiResponse(200,suggestedUsers,"suggested user fetched"));
        
    }catch (error) {
        console.log("Error while fetching user:", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const updateProfile = async(req,res)=>{
    const {fullname,email,username,bio,link} = req.body;
    let {profileImg,coverImg} = req.body;

    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if(profileImg){

            // if(user.profileImg)
                

            // const upload = cloudinary.uploader.upload(profileImg)
            profileImg = (await upload).secure_url
        }
        if(coverImg){
            const upload = cloudinary.uploader.upload(coverImg)
            coverImg = (await upload).secure_url
        }
        
    } catch (error) {
        
    }
}
export const updatePassword = async(req,res)=>{
    const {currPassword,newPassword} = req.body;


    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if(!user)
            return res.status(404).json({message:"User not found"});

        if((!newPassword && currPassword) || (newPassword && !currPassword))
            return res.status(400).json({message:"Both Current and New password is required to change password"});

        const isMatch = bcrypt.compare(currPassword,user.password)
        if(!isMatch)
            return res.status(400).json({message:"password Incorrect"});
        if(newPassword.length<6){
            return res.status(400).json({message:"password too short"});
        }
        const salt = await bcrypt.genSalt(newPassword,10);
        user.password = await bcrypt.hash(newPassword,salt);
        res.status(200).json({message:"password Updated successfully"})

        await user.save({validateBeforeSave:false})

    } catch (error) {
        console.log(err);
        
    }
}
  

