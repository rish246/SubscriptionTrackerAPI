import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Successfully fetched users",
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 401;
            throw error;
        }
        res.status(201).json({
            success: true,
            message: "Successfully fetched user",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};
