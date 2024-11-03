import mongoose from "mongoose";

const url = "mongodb+srv://bhurtsahab786521:akhtar123@cluster0.byxbvz9.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0"

export const connectDB = async ()=>{
    try {
        await mongoose.connect(url);
        console.log("Database connected");
        
    } catch (error) {
        console.log(error)
    }
}
