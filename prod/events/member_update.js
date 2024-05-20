"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const beautyLog_1 = __importDefault(require("../util/beautyLog"));
const event = {
    name: discord_js_1.Events.PresenceUpdate,
    once: false,
    active: true,
    execute: async (oldPresence, newPresence) => {
        if (newPresence.guild.id === "1209632813792628746") {
            if (newPresence?.guild == null)
                return;
            if (oldPresence?.guild == null)
                return;
            if (newPresence?.member == null)
                return;
            if (oldPresence?.member == null)
                return;
            const member = newPresence.member;
            const oldMember = oldPresence.member;
            if (member.presence == null)
                return;
            if (oldMember.presence == null)
                return;
            if (member.presence.activities.length === 0)
                return;
            if (member.presence.activities[0].name === "Custom Status") {
                const customStatus = member.presence.activities[0].state;
                beautyLog_1.default.info(`Member ${member.displayName} changed his custom status to ${customStatus}`);
                if (customStatus?.includes("/novaheaven") || customStatus?.includes("discord.gg/novaheaven")) {
                    beautyLog_1.default.info(`${customStatus}`);
                }
            }
        }
    }
};
exports.default = event;
