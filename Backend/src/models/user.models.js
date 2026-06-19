import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required: true,
    },
    gender:{
        type:String,
        enum:['male', 'female', 'other'],
        default:'male',
    },
    age:{
        type:Number,
        default:null,
    },
    weight:{
        type:Number,
        default:null,
    },
    height:{
        type:Number,
        default:null,
    },
    steps:{
        type:Number,
        default:0,
    },
    isProfileUpdated:{
        type:Boolean,
        default:false,
    },
    
},{timestamp:true})


export const User = mongoose.model('User', userSchema)