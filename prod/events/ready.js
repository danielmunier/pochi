"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const beautyLog_1 = __importDefault(require("../util/beautyLog"));
const { joinVoiceChannel } = require('@discordjs/voice');
const event = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    active: true,
    execute: async (client) => {
        beautyLog_1.default.info("Pochi is ready!");
        const user = await client.users.fetch("324719520482721792");
    }
};
exports.default = event;
