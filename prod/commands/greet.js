"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command = {
    name: "greet",
    execute: (message, args) => {
        console.log("i will find a way");
        let toGreet = message.mentions.members?.first();
        message.channel.send(`Hello there ${toGreet ? toGreet.user.username : message.member?.user.username}!`);
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: [discord_js_1.PermissionFlagsBits.Administrator]
};
exports.default = command;
