import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {User} from '../models/user.model.js'
import {uploadToCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/apiResponse.js'

const registerUser = asyncHandler( async (req, res)=>{
    const {username, fullname, email, password} = req.body
    console.log("email:", email)

    if([username, fullname, email, password].some((item)=>item?.trim()==="")){
        throw new ApiError(400, "All field required!!")
    }

    const userExists = User.findOne({
        $or: [{username}, {email}]
    })
    if(userExists){
        throw new ApiError(409, "User with email or username already exists!!")
    }

    const avatarLocalPath= req.file?.avatar[0]?.path;
    const coverImageLocalPath = req.file?.coverImage[0]?.path;

    if (!avatarLocalPath){
        throw new ApiError(400, "Avatar file required");
    }
    
    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverImage = await uploadToCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file required!!")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username:username.toLowerCase(),
        password,
        email
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user!!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered!")
    )

})

export {registerUser}