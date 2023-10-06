const discord = require('discord.js')
const process = require('node:process')

module.exports = (client) => {
        const err_channel = '988838140192100392'
        
        process.on('unhandledRejection', async (reason, p) => {
            console.log("Unhandled Rejection at: Promise", p, "reason:", reason);

        })

        process.on('uncaughtException', async (err, origin) => {
            console.log("Uncaught Exception:", err, "origin:", origin);


        })

        process.on('uncaughtExceptionMonitor', (err, origin) => {
            console.log(err, origin);
        })

        process.on('typeError', (err, origin) => {

            console.log(err, origin);
        })
}