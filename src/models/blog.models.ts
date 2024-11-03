import mongoose, { Schema, Types } from "mongoose";

const blogSchema = new Schema({
    userId:{
        type: Types.ObjectId,
        required: true
    },
    postedBy:{
        type : String,
        required: true
    },
    userImage:{
        type: String,
        required: false
    },
    title: {
        type: String,
        trim : true,
        required: true
    },
    content: {
        type: String,
        trim : true,
        required: true
    },
    category: {
        type: String,
        trim : true,
        required: true
    },
    tags: {
        type: Array,
        trim : true,
        required: true
    },
}, {timestamps: true}  )

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
