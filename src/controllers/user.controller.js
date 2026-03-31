import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"
const registerUser = asyncHandler( async (req, res) =>{
  //get user details from frontend
  //validation - not empty
  //check if user already exist: username, email
  //files exist or not: avatar and coverImage
  //upload them to cloudinary
  //create user object - create entry in db
  //remove password and refresh token from field from response
  //check for user creation
  //return response

  const { fullName, email, username, password } = req.body

  
  
  // if(fullName === ""){
  //   throw new ApiError(400, "fullName is required")
  // }

  if([fullName, email, username, password].some((field) => field?.trim() === ""))
  {
    throw new ApiError(400, "All fields are required")
  }

 const existedUser = await User.findOne({
    $or: [{username}, {email}]
  })

  if(existedUser){
    throw new ApiError(409, "User with email or username already exist")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  let coverImageLocalPath;
 
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){

    coverImageLocalPath = req.files.coverImage[0].path ;
    
  }

 
 
  
 if(!avatarLocalPath){
  throw new ApiError(400, "Avatar file is required")
 }

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

 if(!avatar){
   throw new ApiError(400, "Avatar file is required")
}
  
const user = await User.create({
  fullName,
  avatar,
  coverImage: coverImage || "",
  email,
  password,
  username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
  "-password -refreshTocken"
)

if(!createdUser){
  throw new ApiError(500, "something went wrong while registration")
}

return res.status(201).json(
  new ApiResponse(200, createdUser, "User registered Successfully")
)
})



export {registerUser}