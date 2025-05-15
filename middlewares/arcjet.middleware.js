import aj from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
    try {
        const request = await aj.protect(req);
        if (request.isDenied()) {
            if (request.reason.isBot())
                return res
                    .status(403)
                    .json({ success: false, error: "Bot not allowed" });
            if (request.reason.isRateLimit())
                return res
                    .status(429)
                    .json({ success: false, error: "Rate limit exceeded" });
            return res
                .status(403)
                .json({ success: false, error: "Access denied" });
        }
        next();
    } catch (err) {
        console.error(`Arcjet error: ${err.message}`);
        next(err);
    }
};
