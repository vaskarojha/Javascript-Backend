import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required: true
        },
        age:{
            type:Number,
            required: true
        }
    },
    {
        timeStamps:true,
    }
)

export const User = mongoose.model('User', userSchema)