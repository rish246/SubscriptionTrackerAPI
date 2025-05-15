import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minLength: 2,
            maxLength: 30,
        },
        email: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            lowercase: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, "Please fill a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: 6,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
