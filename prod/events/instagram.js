"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instagram_1 = require("../functions/instagram");
const discord_1 = require("../functions/discord");
const config_1 = require("../config");
const Post_1 = require("../database/functions/Post");
const event = {
    name: "ready",
    once: false,
    active: false,
    execute: async (client) => {
        try {
            await (0, instagram_1.getLatestPost)("querovagas23").then(async (data) => {
                await (0, Post_1.findPost)(data).then((result) => {
                    if (!result) {
                        (0, Post_1.storePost)(data);
                        (0, discord_1.sendInstagramToChannel)(client, config_1.config.DISCORD_JOB_CHANNEL, data, config_1.config.DISCORD_GUILD_ID);
                    }
                });
            });
            setInterval(() => {
                (0, instagram_1.getLatestPost)("querovagas23").then((data) => {
                    (0, Post_1.findPost)(data).then((result) => {
                        if (!result) {
                            (0, Post_1.storePost)(data);
                            (0, discord_1.sendInstagramToChannel)(client, config_1.config.DISCORD_JOB_CHANNEL, data, config_1.config.DISCORD_GUILD_ID);
                        }
                    });
                });
            }, 1200000);
        }
        catch (e) {
            console.log(e);
        }
    },
};
exports.default = event;
