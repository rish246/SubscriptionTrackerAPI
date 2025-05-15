import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "../config/config.js";

if (!MONGO_URI) {
    throw new Error("Please define MONGO_URI in .env.local");
}

export const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Connected to DB in ${NODE_ENV} mode`);
    } catch (err) {
        console.error("Connection to db failed", err);
    }
};
