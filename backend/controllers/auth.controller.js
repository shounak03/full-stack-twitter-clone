import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const signup = async(req,res)=>{
    try{
        const {fullname,username, email, password} = req.body

        if( //s2
            [fullname, email, username, password].some((field)=>field?.trim()==="")
          ){
            throw new ApiError(400,"All fields are required")
          }
    
        
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(email))
            return res.status(404).json({error:"Invalid email address"});

        const existingUser = await User.findOne({username})
        if(existingUser){
            throw new ApiError(401,"Username already take, try again!")
        }
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            throw new ApiError(401,"email already exists")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt)

        const user = new User({fullname, username,email,password:hashedPass})


        if(user){
            generateTokenAndSetCookie(user._id,res)
            await user.save();
            
            // user

            // res.status(200).json(
            //     {fullname:user.fullname, 
            //     username:user.username ,
            //     email:user.email,
            //     profileImg:user.profileImg
            // })
        }else{
            throw new ApiError(500,"something went wrong")
        }
        const created_user = await User.findById((user._id)).select( 
            "-password"
        )
        return res.status(201).json( 
            new ApiResponse(200,created_user,"user registered successfully")
        )


        // const user = await User.create({fullname, username,email,password:hashedPass})

        // const created_user = await User.findById(user._id).select("-password")

        // if(created_user){
        //     generateTokenAndSetCookie(user._id,res)
        //     new ApiResponse(200,created_user,"user registered successfully")
        // }
        // else{
        //     throw new ApiError(500,"something went wrong while registering user")
        // }

    }catch(err){
        throw new ApiError(500,`something went wrong - ${err}`)
        
    }
}
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