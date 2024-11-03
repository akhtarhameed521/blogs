import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        requred: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: String,
        trim: true,
        required: false,
        default: ""
    },
    description:{
        type: String,
        trim: true,
        required: false,
        default: ""
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {timestamps: true})

export const User = mongoose.models.User || mongoose.model("User", userSchema)
