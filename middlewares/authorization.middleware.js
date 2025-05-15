import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/config.js";

export const authorize = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token)
            return res
                .status(401)
                .json({ success: false, error: "Unauthorized" });

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user)
            return res
                .status(401)
                .json({ success: false, error: "Unauthorized" });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ success: false, error: err.message });
    }
};
