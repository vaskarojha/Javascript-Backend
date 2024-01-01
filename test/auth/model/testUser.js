import mongoose from "mongoose";

const testUserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        default:null
    },
    lastname:{
        type:String,
        default:null
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:null
    },
})

export const TestUser =  mongoose.model("testUser", testUserSchema)