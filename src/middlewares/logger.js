import winston from "winston"
const misLevels = {
    levels:{
        error:0,
        warning:1,
        info: 2
    }
}
export const logger = winston.createLogger({
    levels: misLevels.levels,
    transports: [
        new winston.transports.Console({
            level: "info"
        }),
        new winston.transports.File({
            filename: "./warn.log",
            level: "warning"
        }),
        new winston.transports.File({
            filename: "./error.log",
            level: "error"
        })
    ]
})