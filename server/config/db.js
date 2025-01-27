import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database Connected"));
        mongoose.connection.on("error", (err) => console.error("MongoDB Connection Error:", err));

        await mongoose.connect(`${process.env.MONGODB_URI}/jobportal`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;
