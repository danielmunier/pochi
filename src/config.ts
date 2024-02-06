import dotenv from "dotenv"

dotenv.config()

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_JOB_CHANNEL, DISCORD_GUILD_ID, MONGO_DB_URI, WEBHOOK_ID, WEBHOOK_TOKEN } = process.env

if(!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_JOB_CHANNEL || !DISCORD_GUILD_ID || !MONGO_DB_URI) {
    throw new Error("Missing env variables")
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DISCORD_JOB_CHANNEL,
    DISCORD_GUILD_ID,
    MONGO_DB_URI,
    WEBHOOK_ID,
    WEBHOOK_TOKEN
}