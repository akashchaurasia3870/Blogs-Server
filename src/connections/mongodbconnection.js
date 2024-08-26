import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Define an asynchronous function to establish a MongoDB connection
async function connectToMongoDB() {
    // Retrieve MongoDB connection details from environment variables
    const username = process.env.DB_USER; // MongoDB username
    const password = process.env.DB_PASS; // MongoDB password
    const url = process.env.MONGO_DB_URL; // MongoDB URL
    const db_name = process.env.COLLECTION_NAME; // MongoDB URL
    // 

    // const mongoURI = "mongodb://localhost:27017/blog_v1"
    // Construct the MongoDB connection URI with username and password
    const mongoURI = `mongodb+srv://${username}:${password}@${url}/${db_name}?retryWrites=true&w=majority`;

    // Attempt to connect to the MongoDB database using Mongoose
    await mongoose.connect(mongoURI);

    // Log a success message if the connection is established
    console.log("MongoDB Connected");
}

// Export the 'connect' function for use in your application
export { connectToMongoDB };

export const getDB = () => {
    return db_connection;
}

