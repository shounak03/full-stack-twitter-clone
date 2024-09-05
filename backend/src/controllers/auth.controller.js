import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const signup = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Invalid email address");
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            throw new ApiError(409, existingUser.username === username ? "Username already taken" : "Email already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

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
        }

        if (coverImage_url) {
            coverImg = await uploadOnCloudinary(coverImage_url);
            if (!coverImg) {
                throw new ApiError(500, "Error uploading cover image");
            }
        }

        const user = new User({
            fullname,
            username,
            email,
            password: hashedPass,
            profileImg: profileImg?.url,
            coverImg: coverImg?.url
        });

        await user.save();

        generateTokenAndSetCookie(user._id, res);

        const created_user = await User.findById(user._id).select("-password");

        return res.status(201).json(
            new ApiResponse(201, created_user, "User registered successfully")
        );

    } catch (err) {
        if (err instanceof ApiError) {
            throw err;
        }
        throw new ApiError(500, `Something went wrong: ${err.message}`);
    }
};
const signout = async(req,res)=>{

    try{    
        res.cookie("jwt","",{maxAge:0})

        res.status(200).json(new ApiResponse(
            200,{},"User logged out"
          ))

    }catch(err){
        throw new ApiError(500,`internal Server error: ${err}`)
    }

}
const login = async(req,res)=>{
    try {
        const {username, password} = req.body

        
        const user = await User.findOne({username});

        const isPassCorrect = bcrypt.compare(password,user?.password)

        if(!user || !isPassCorrect){
            throw new ApiError(400,"invalid username or password");
        }
        generateTokenAndSetCookie(user._id,res)

        const created_user = await User.findById((user._id)).select( 
            "-password"
        )
        return res.status(200).json( 
            new ApiResponse(200,created_user,"user logged-in successfully")
        )

    } catch (err) {
        throw new ApiError(500,`something went wrong: ${err}`)
    }
}

const getMe = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.status(200).json(new ApiResponse(200,user,"user details"))
    } catch (error) {
        throw new ApiError(500,`something went wrong: ${err}`)
    }
}

export {login, signout, signup, getMe}