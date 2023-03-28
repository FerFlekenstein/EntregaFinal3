import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
export default {
    jwt:{
        token: process.env.JWT_TOKEN,
        cookie: process.env.JWT_COOKIE
    },
    mongo:{
        URL: process.env.mongoURL
    },
    github:{
        secret: process.env.githubSecret,
        clientID: process.env.clientGithubID
    }
}