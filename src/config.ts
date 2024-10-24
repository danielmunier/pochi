import dotenv from "dotenv"

dotenv.config()

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_JOB_CHANNEL, DISCORD_GUILD_ID, WEBHOOK_ID, WEBHOOK_TOKEN, GEMINI_API_KEY } = process.env

if(!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_JOB_CHANNEL || !DISCORD_GUILD_ID || !GEMINI_API_KEY) {
    throw new Error("Missing env variables")
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DISCORD_JOB_CHANNEL,
    DISCORD_GUILD_ID,
    WEBHOOK_ID,
    WEBHOOK_TOKEN,
    GEMINI_API_KEY
}