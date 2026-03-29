import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const videoSchema = new Schema({
    videoFile: {
      type: String, //cloudanary url
      required: true
    },
    thumbnail: {
      type: String, //cloudanary url
      required: true
    },
    title: {
      type: String,
      required: true
    },
    discription: {
      type: String,
      required: true
    },

    duration: {
      type: Number, //cloudanary
      required: true
    },

    views: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      deafault: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
}, 
{timestamps: true}
)

videoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model("Video", videoSchema)