import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import { User } from "../models/user.models.js"



const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
            dbName: DB_NAME,
        })
        console.log(`\n MongoDB Connected..! DB HOST ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection Failed:", error)
        process.exit(1)
    }
}

export default connectDB
