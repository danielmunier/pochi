"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const event = {
    name: discord_js_1.Events.MessageCreate,
    once: false,
    active: true,
    execute: (message) => {
    }
};
exports.default = event;
