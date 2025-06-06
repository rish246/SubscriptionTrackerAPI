import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import { ARCJET_KEY } from "./config.js";
const aj = arcjet({
    // Get your site key from https://app.arcjet.com and set it as an environment
    // variable rather than hard coding.
    key: ARCJET_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                "POSTMAN",
            ],
        }),
        // Create a token bucket rate limit. Other algorithms are supported.
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // Refill 5 tokens per interval
            interval: 10, // Refill every 10 seconds
            capacity: 10, // Bucket capacity of 10 tokens
        }),
    ],
});

export default aj;
