import mongoose from "mongoose";

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

export default dbConnection;