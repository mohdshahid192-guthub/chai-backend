import { Router } from "express";
import { loginUser, logOutUser, registerUser, refreshAccessToken, changeCurrentUserPass, getCurrentUser, updateUsercoverImage, updateUserAvatar, updateAccountDetails } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.route("/register").post(
  upload.fields([
   {
    name: "avatar",
    maxCount: 1
   },
   {
    name: "coverImage",
    maxCount: 1
   }
  ]),
  registerUser)

  router.route("/login").post(loginUser)
  router.route("/logout").post(verifyJWT, logOutUser)
  router.route("/access-refresh-Token").post(refreshAccessToken)
  router.route("/change-password").post(verifyJWT, changeCurrentUserPass)
  router.route("/current-user").post(verifyJWT, getCurrentUser)
  router.route("/update-details").post(verifyJWT, updateAccountDetails)
  router.route("/update-avatar").post(upload.fields({
   name: avatar,
   maxCount: 1
  }),verifyJWT, updateUserAvatar)
  router.route("/update-cover-image").post(upload.fields({
   name: coverImage,
   maxCount: 1
  }),verifyJWT, updateUsercoverImage)

export default router