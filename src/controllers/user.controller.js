import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {User} from '../models/user.model.js'
import {uploadToCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/apiResponse.js'

const generateAccessAndRefreshTokens = async (userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken() 
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        
        return {accessToken, refreshToken}

    } catch(err){
        throw new ApiError(500, "Access and refresh token not generated!!")
    }
}



const registerUser = asyncHandler( async (req, res)=>{
    const {username, fullname, email, password} = req.body

    if([username, fullname, email, password].some((item)=>item?.trim()==="")){
        throw new ApiError(400, "All field required!!")
    }

    const userExists = await User.findOne({
        $or: [{username}, {email}]
    })
    if(userExists){
        throw new ApiError(409, "User with email or username already exists!!")
    }

    const avatarLocalPath= req.files?.avatar[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath){
        throw new ApiError(400, "Avatar file path required");
    }
    
    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverImage = await uploadToCloudinary(coverImageLocalPath);

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



const loginUser = asyncHandler( async(req, res)=>{
    const {username, email, password}= req.body

    if(!email && !username){
        throw new ApiError(400, "Username or email is required!!")
    }
    const user = await User.findOne(
        {
            $or:[email, username]
        }
    )
    if(!user){
        throw new ApiError(404, "No user in DB!!")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(404, "Incorrect Password!!")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, {
        user: loggedInUser, accessToken, refreshToken
    },
    "Login successful!!"))
})

const logoutUser = asyncHandler(async (req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,{
            $set: {refreshToken: undefined}
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly:true,
        secure:true
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(
        200, {}, "User logged out!"
    ))
})

export {registerUser, loginUser, logoutUser}