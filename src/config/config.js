import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
export default {
    jwt: {
        token: process.env.JWT_TOKEN,
        cookie: process.env.JWT_COOKIE
    },
    mongo: {
        URL: process.env.mongoURL
    },
    app: {
        GMAIL_USER: process.env.GMAIL_USER,
        GMAIL_PW: process.env.GMAIL_PW,
        GMAIL_ADMIN: process.env.GMAIL_ADMIN
    }
}