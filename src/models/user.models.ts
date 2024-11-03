import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),  // Generates ObjectId for MongoDB
    },
    googleId: {
        type: String,
        unique: true,
        required: false,
        
    },
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
    password: {
        type: String,
        required: function() {
          return !this.isOAuthUser; 
        },
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
    isOAuthUser: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {timestamps: true})

export const User = mongoose.models.User || mongoose.model("User", userSchema)
