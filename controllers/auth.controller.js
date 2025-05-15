import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/config.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { email, name, password } = req.body;
        // if email already exists... Abort
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const message = "User already exists";
            const error = new Error(message);
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create(
            [{ name, email, password: hashedPassword }],
            { session }
        );

        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUser[0],
            },
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const message = "User doesnt exists";
            const error = new Error(message);
            error.status = 404;
            throw error;
        }

        // check password
        const areSame = await bcrypt.compare(password, existingUser.password);
        if (!areSame) {
            const message = "Unauthorized access";
            const error = new Error(message);
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.status(201).json({
            success: true,
            message: "Successfully logged in",
            data: {
                token,
                user: existingUser,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
        next(err);
    }
};

export const signOut = (req, res, next) => {
    res.json({ message: "LOGOUT User" });
};
