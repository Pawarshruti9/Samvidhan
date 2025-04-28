import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
        return true;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
};

export default connectToDatabase;