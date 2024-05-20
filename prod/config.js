"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_JOB_CHANNEL, DISCORD_GUILD_ID, MONGO_DB_URI, WEBHOOK_ID, WEBHOOK_TOKEN } = process.env;
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_JOB_CHANNEL || !DISCORD_GUILD_ID || !MONGO_DB_URI) {
    throw new Error("Missing env variables");
}
exports.config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DISCORD_JOB_CHANNEL,
    DISCORD_GUILD_ID,
    MONGO_DB_URI,
    WEBHOOK_ID,
    WEBHOOK_TOKEN
};
