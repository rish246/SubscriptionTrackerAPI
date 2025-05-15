import { config } from "dotenv";
import * as process from "process";

const path = `.env.${process.env.NODE_ENV || "development"}.local`;
config({ path });
export const {
    PORT,
    NODE_ENV,
    MONGO_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_URL,
    QSTASH_TOKEN,
    EMAIL_ADDRESS,
    EMAIL_PASSWORD,
    SERVER_ADDRESS,
} = process.env;
