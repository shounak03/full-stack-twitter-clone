import { Notification } from "../models/notification.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async(req,res)=>{
    let {text} = req.body;

    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if(!user){
            throw new ApiError(404,"User not found")
        }
        let img_url;
        if(req.file){
            img_url = req.file?.path;
        }

        
        let img;
        if(img_url){
            img = await uploadOnCloudinary(img_url);
        }
        if(!text && !img){
            throw new ApiError(400,"Please enter text or image")
        }
        const newPost = new Post({
            user:userId,
            text,
            img:img?.url || ""
        })
        await newPost.save()
        await User.findByIdAndUpdate(
            userId,
            { $push: { posts: newPost._id } },
            { new: true, runValidators: true }
        );

        return res.status(200).json(new ApiResponse(200,newPost,"Posted"))
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
        
    }
}

const likePost = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const post = await Post.findById(id);
  
      if (!post) {
        throw new ApiError(404, "Post not found");
      }
  
      const userLikedPost = post.likes.includes(userId);
      let updatedPost;
  
      if (userLikedPost) {
        updatedPost = await Post.findByIdAndUpdate(id, { $pull: { likes: userId } }, { new: true });
        await User.updateOne({_id:userId},{$pull:{likedPost:id}});
        return res.status(200).json(new ApiResponse(200, updatedPost, "Un-Liked"));
      } else {
        updatedPost = await Post.findByIdAndUpdate(id, { $push: { likes: userId } }, { new: true });
        await User.updateOne({_id:userId},{$push:{likedPost:id}});
      }
  
      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
  
      await notification.save();
      return res.status(200).json(new ApiResponse(200, updatedPost, "Liked"));
    } catch (error) {
      console.error("Error in likePost:", error);
      return res.status(500).json({ error: error.message || "An error occurred while liking the post" });
    }
};
  

const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const { id } = req.params.id;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Please enter text for the comment" });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const newComment = {
            user: userId,
            text: text
        };

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $push: { comments: newComment } },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(500).json({ error: "Failed to add comment" });
        }

        return res.status(200).json({ message: "Comment added successfully", comment: newComment });

    } catch (error) {
        console.error("Error in commentOnPost:", error);
        return res.status(500).json({ error: error.message || "An error occurred while posting the comment" });
    }
}

const deleatePost = async(req,res)=>{
    try {
        const userId = req.user._id;
        const {id} = req.params
        const post = await Post.findById(id)
        if(!post){
            throw new ApiError(404,"post not found")

        }
        if(post.user.toString() !== userId.toString()){
            return res.status(500).json({error:'Unauthrize to delete post'})
        }
        if(post.img){
            const imgId = post.img.split('/').pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId)
        }
        await Post.findByIdAndDelete(id)
        res.status(200).json(new ApiResponse(200,"Post deleted successfully"))
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
        
    }

}

const getAllPost = async(req,res)=>{
    
    try {
        const posts = await Post.find().sort({createdAt:-1}).populate({
            path:"user",
            select:"-password -email"
        })
    
        if(posts.length === 0)
            return res.status(400).json({message:"no post found"})
        res.status(200).json(posts)
    } catch (error) {
        console.log("Error in getAllPost controller: ",error);
        res.status(500).json({error:"internal server error"});
    }
        
}

const getLikedPost = async(req,res)=>{

    try {
        const userId  = req.params.userId;

        const user = await User.findById(userId)
        
        if(!user)
            throw new ApiError(404,"user not found");
        const posts = await Post.find({ _id: { $in: user.likedPost } })
            .populate({
                path: "user",
                select: "-password -email"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            });

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getLikedPost controller: ",error);
        res.status(500).json({error:"internal server error"});
    }

}
const followingPost = async(req,res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user)
            throw new ApiError(404,"user not found");

        const following = user.following;

        const feedPosts = await Post.find({user: {$in:following}})
        .sort({createdAt:-1})
        .populate({
            path: "user",
            select: "-password -email"
        })
        .populate({
            path: "comments.user",
            select: "-password, email"
        })

        res.status(200).json(new ApiResponse(200,feedPosts))
    } catch (error) {
        console.log("Error in followingPost controller: ",error);
        res.status(500).json({error:"internal server error"});   
    }
}

const getUserPost = async(req,res)=>{
    try {
        const {username} = req.params;
        const userId = req.user._id;
        
        const user = await User.findOne({ username })
        if(!user){
            throw new ApiError(404,"user not found");
        }
        const posts = await Post.find({ user:user._id })
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .populate({
                path: "user",
                select: "username profilePicture" // Adjust these fields as per your User model
            })
            .populate({
                path: "comments.user",
                select: "username profilePicture"
            });
            res.status(200).json(new ApiResponse(200, posts));
    } catch (error) {
        
    }
}
export { createPost,likePost,commentOnPost,deleatePost, getAllPost, getLikedPost,followingPost, getUserPost}