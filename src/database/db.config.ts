import mongoose from "mongoose";

const url = process.env.NEXT_PUBLIC_MONGO_DB_URI

export const connectDB = async ()=>{
    try {
        await mongoose.connect(url as string);
        console.log("Database connected");
        
    } catch (error) {
        console.log(error)
    }
}
