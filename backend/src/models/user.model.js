import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    followers:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    following:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    profileImg:{
        type:String,
        default:""
    },
    coverImg:{
        type:String,

    },
    bio:{
        type:String,

    },
    link:{
        type:String,
        default:""
    },
    posts:[
        {
        type:Schema.Types.ObjectId,
        ref:"Post",
        default:[]
        }
    ],
    likedPost:[
        {
            type:Schema.Types.ObjectId,
            ref:"Post",
            default:[]
        }
    ]

},{timestamps:true})

export const User = mongoose.model("User",userSchema)