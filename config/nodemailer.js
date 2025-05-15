import nodemailer from "nodemailer";
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from "./config.js";

console.log({ EMAIL_ADDRESS, EMAIL_PASSWORD });
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
    },
});
