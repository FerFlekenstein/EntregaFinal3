import nodemailer from "nodemailer";
import config from "../config/config.js";
export const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: config.app.GMAIL_USER,
        pass: config.app.GMAIL_PW
    }
});