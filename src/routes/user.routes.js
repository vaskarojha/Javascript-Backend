import {Router} from 'express'
import { loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCover, getUserChannelProile, getWatchHistory } from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)


router.route("/logout").post(verifyJwt, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/changePassword").post(changeCurrentPassword)

router.route("/currentUser").post(verifyJwt, getCurrentUser)

router.route("/updateUserInfo").patch(verifyJwt, updateAccountDetails)

router.route("/updateAvater").patch(verifyJwt, upload.single("avatar"), updateUserAvatar)

router.route("/updateCoverImage").patch(verifyJwt, upload.single("/coverImage"),updateUserCover)

router.route("/getChannelProfile/:username").get(verifyJwt, getUserChannelProile)

router.route("/watchHistory").get(verifyJwt, getWatchHistory)

export default router