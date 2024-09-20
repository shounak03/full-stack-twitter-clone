import { Notification } from "../models/notification.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
    let { text } = req.body;

    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        let img_url;
        if (req.file) {
            img_url = req.file.path;
        }

        let img;
        if (img_url) {
            img = await uploadOnCloudinary(img_url);
        }

        if (!text && !img) {
            throw new ApiError(400, "Please enter text or image");
        }

        const newPost = new Post({
            user: userId,
            text,
            img: img?.url || ""
        });

        await newPost.save();
        await User.findByIdAndUpdate(
            userId,
            { $push: { posts: newPost._id } },
            { new: true, runValidators: true }
        );

        return res.status(200).json(new ApiResponse(200, newPost, "Posted"));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

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

            await Post.findByIdAndUpdate(id, { $pull: { likes: userId } });
            await User.updateOne({ _id: userId }, { $pull: { likedPost: id } });
        } else {

            await Post.findByIdAndUpdate(id, { $push: { likes: userId } });
            await User.updateOne({ _id: userId }, { $push: { likedPost: id } });

            if (userId.toString() !== post.user.toString()) {

                const notification = new Notification({
                    from: userId,
                    to: post.user,
                    type: "like",
                });
                await notification.save();
            }
        }

        // Fetch the updated post with populated user information
        updatedPost = await Post.findById(id).populate('user', 'username profileImg fullname');

        // Return the updated post with likes and user details
        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error in likePost:", error);
        return res.status(500).json({ error: error.message || "An error occurred while liking the post" });
    }
};

  

// const commentOnPost = async (req, res) => {
//     try {
//         const { text } = req.body;
//         const { id } = req.params;
//         const userId = req.user._id;

//         if (!text) {
//             return res.status(400).json({ error: "Please enter text for the comment" });
//         }

//         // Find the post by ID
//         const post = await Post.findById(id);
//         if (!post) {
//             return res.status(404).json({ error: "Post not found" });
//         }

//         const newComment = {
//             user: userId,
//             text: text
//         };

//         // Push the new comment to the post's comments array
//         post.comments.push(newComment);
//         // Save the post and get the updated document
//         await post.save();
//         const updatedPost = await Post.findById(id).populate('user', 'username profileImg fullname');

//         // Return the updated post with all comments
//         const populatedNewComment = await Post.findOne(
//             { 'comments._id': newComment._id },
//             { 'comments.$': 1 } // This projects only the new comment
//         ).populate({
//             path: 'comments.user', // Populate the user field in the comment
//             select: 'username fullName profileImg',
//         });

//         // Return the updated post with populated comments and the new comment
//         return res.status(200).json(updatedPost);
//         // return res.status(200).json({ 
//         //     message: "Comment added successfully", 
//         //     updatedPost, 
//         //     newComment: populatedNewComment ? populatedNewComment.comments[0] : null,
//         // });


//     } catch (error) {
//         console.error("Error in commentOnPost:", error);
//         return res.status(500).json({ error: error.message || "An error occurred while posting the comment" });
//     }
// }
const commentOnPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $push: { comments: { text, user: userId } } },
            { new: true, runValidators: true }
        ).populate('user', 'username profileImg fullname')
          .populate('comments.user', 'username profileImg fullname');

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Return the entire updated post
        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error in commentOnPost:", error);
        return res.status(500).json({ error: error.message || "An error occurred while commenting on the post" });
    }
};


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
            .sort({createdAt:-1})
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
        console.log(user.username);
        

        const following = user.following;

        const feedPosts = await Post.find({user: {$in:following}})
        .sort({createdAt:-1})
        .populate({
            path: "user",
            select: "-password -email"
        })
        .populate({
            path: "comments.user",
            select: "-password -email"
        })

        res.status(200).json(feedPosts)
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
            res.status(200).json(posts);
    } catch (error) {
        
    }
}


const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the post and populate the comments' user fields
        const post = await Post.findById(id)
            .populate({
                path: 'comments.user',  // Populate the user field in comments
                select: 'username fullName profileImg'  // Select the fields to include
            });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).json({ error: error.message || "An error occurred while fetching the post" });
    }
};


export { getPost ,createPost ,likePost ,commentOnPost ,deleatePost ,getAllPost ,getLikedPost ,followingPost ,getUserPost }