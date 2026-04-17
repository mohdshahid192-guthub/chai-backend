

import mongoose, {Schema} from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { User } from "./user.model";

const subscriptionSchema = new Schema({

 subscriber: {
    type: Schema.Types.ObjectId,
    ref: "User"
 },
 channel: {
  type: Schema.Types.ObjectId,
  ref: "User"
 }


}, {timestamps: true})




export const Subscription = mongoose.model("Subscription", subscriptionSchema)