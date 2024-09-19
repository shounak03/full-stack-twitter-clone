import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from "cloudinary";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
        res.status(200).json({message:"User Unfollowed Successfully"});
    }else{
        await User.findByIdAndUpdate(id,{
            $push:{followers:req.user._id}
        })
        await User.findByIdAndUpdate(req.user._id,{
            $push:{following:id}
        })
        res.status(200).json({message:"User followed Successfully"});

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
export const updateProfile = async (req, res) => {
    const { fullname, email, username, bio, link } = req.body;
    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        let profileImg_url, coverImage_url;

        if (req.files) {
            profileImg_url = req.files.profileImg?.[0]?.path;
            coverImage_url = req.files.coverImg?.[0]?.path;
        }

        let profileImg, coverImg;

        if (profileImg_url) {
            profileImg = await uploadOnCloudinary(profileImg_url);
            if (!profileImg) {
                throw new ApiError(500, "Error uploading profile image");
            }
            if (user.profileImg) {
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split(".")[0]);
            }
        }

        if (coverImage_url) {
            coverImg = await uploadOnCloudinary(coverImage_url);
            if (!coverImg) {
                throw new ApiError(500, "Error uploading cover image");
            }
            if (user.coverImg) {
                await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split(".")[0]);
            }
        }

        // Update user fields
        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg?.url || user.profileImg;
        user.coverImg = coverImg?.url || user.coverImg;

        // Save the updated user
        await user.save();

        // Return the updated user (excluding sensitive information)
        const updatedUser = user.toObject();
        delete updatedUser.password;

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "An error occurred while updating the profile"
        });
    }
};
export const updatePassword = async(req,res)=>{
    
    const {currPassword,newPassword} = req.body;
    console.log(newPassword);
    


    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        console.log(user);
        
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
        const salt =  bcrypt.genSalt(10);
        user.password = bcrypt.hash(newPassword,salt);
        
        await user.save({validateBeforeSave:false})
        res.status(200).json({message:"password Updated successfully"})

    } catch (error) {
        console.log("something went wrong:", error.message);
        res.status(500).json({ error: error.message });
    }
}
  

