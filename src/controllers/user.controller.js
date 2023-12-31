import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {User} from '../models/user.model.js'
import {uploadToCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/apiResponse.js'
import  jwt  from 'jsonwebtoken'
import { response } from 'express'

const generateAccessAndRefreshTokens = async (userId)=>{
    try{
        const user = await User.findById(userId)
        console.log(user.fullname)
        const accessToken = user.generateAccessToken() 
        const refreshToken = user.generateRefreshToken()
        console.log("THIS IS TEST----", accessToken)
        console.log("THIS IS TEST---->", accessToken)
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

const loginUser =  asyncHandler(async (req, res)=>{
    const {username, email, password}=  req.body

    if(!email && !username){
        throw new ApiError(400, "Username or email is required!!")
    }
    const user = await User.findOne(
        {
            $or:[{email}, {username}]
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

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {
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
        200, {}, "User logged out."
    ))
})

const refreshAccessToken = asyncHandler(async (req, res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(incomingRefreshToken){
        throw new ApiError(401, "unauthorized request")
    }

    try{
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)

    if(!user){
        throw new ApiError(401, "invalid token")
    }

    if(!incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401, "Refresh token is expired!!")
    }

    const options= {
        httpOnly:true,
        secure:true
    }
    const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    return res.status(200).cookie("accessToken",accessToken, options).cookie("refreshToken", newRefreshToken, options).json(
        new ApiResponse(200, {accessToken,refreshToken: newRefreshToken}, "Access token refreshed!!")
    )
    } catch(err){
        throw new ApiError(401, err?.message || "Invalid refresh token!!")
    }
})

const changeCurrentPassword = asyncHandler(async(req, res)=> {
    const {oldPassword, newPassword} = req.body
    
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Incorrect old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res.status(200).json(new ApiResponse(200, {}, "Password changed."))

})

const getCurrentUser = asyncHandler(async(req, res)=>{
    return res.status(200).json(200, req.user, "Current user fetched!!")
})

const updateAccountDetails = asyncHandler(async(req, res)=>{
    const {fullname, email} =req.body
     if(!fullname || !email){
        throw new ApiError(400, "All fields required!!")
     }
    const user=  User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                fullname, email
            }
        },
        {new:true}).select("-password")
        return res.status(200).json(new ApiResponse(200, user, "Account detail updated!!"))
})

const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath = req.file?.path
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file missing!!")
    }

    const avatar = await uploadToCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(400, "Error on uploading file")
    }

   const user =  User.findByIdAndUpdate(req.user._id,
        {
            $set:{avatar:avatar.url}
        },
        {new:true}).select("-password")

        return res.status(200).json(
            new ApiResponse(200, user, "Avatar image updated!!")
        )
})

const updateUserCover = asyncHandler(async(req,res)=>{
    const coverLocalPath = req.file?.path
    if(!coverLocalPath){
        throw new ApiError(400, "Cover file missing!!")
    }

    const cover = await uploadToCloudinary(coverLocalPath)

    if(!cover.url){
        throw new ApiError(400, "Error on uploading cover image file")
    }

    const user = User.findByIdAndUpdate(req.user._id,
        {
            $set:{coverImage:coverImage.url}
        },
        {new:true}).select("-password")
    return res.status(200).json(
        new ApiResponse(200, user, "Cover image updated!!")
    )
})

const getUserChannelProile = asyncHandler(async(req,res)=>{
    const {username} = req.params

    if(!username?.trim()){
        throw new ApiError(400, "username required!!")
    }

    const channel = await User.aggregate([
       { $match:{
            username: username?.toLowerCase()
        }},
        {
            $lookup:{
                from:"subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields:{
                subscribersCount:{
                    $size: "$subscribers"
                },
                channelsSubscribedToCount:{
                    $size: "$subscribedTo"
                },
                isSubscribed:{
                    $condition:{
                        if:{$in: [req.user?._id, "subscribers.subscriber"]},
                        then: true,
                        else:false
                    }
                }
            }
        },
        {
            $project:{
                fullname:1,
                username:1,
                subscribersCount:1,
                channelsSubscribedToCount:1,
                isSubscribed:1,
                avatar:1,
                coverImage:1,
                email:1
            }
        }
    ])

    if(!channel?.length){
        throw new ApiError(404, "Channel does not exists!!")
    }
    return res.status(200).json(new ApiResponse(200, channel[0]), "User and channel data fetched!!")

})


const getWatchHistory = asyncHandler(async(req, res)=>{
    const user = await User.aggregate([
        {
            $match:{
                _id: new mangoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from : "videos",
                localField:"watchHistory",
                foreignField:"_id",
                as:"watchHistory",
                pipeline:[

                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"owner",
                            pipeline:[
                                {
                                    $project:{
                                        fullname:1,
                                        username:1,
                                        avatar:1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner:{
                                $first:"$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])
    return res.status(200).json(new ApiResponse(200, user[0], watchHistory,  "Watch History fetched!!" ))
})

export {registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateUserAvatar, updateUserCover, updateAccountDetails, getUserChannelProile, getWatchHistory}