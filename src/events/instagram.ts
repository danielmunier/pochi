import { Client } from "discord.js";
import { BotEvent } from "../types";
import { getLatestPost } from "../functions/instagram";
import { postChannel } from "../functions/discord";
import { config } from "../config";

const event: BotEvent = {
  name: "ready",
  once: false,
  execute: async (client: Client) => {
    getLatestPost("querovagas23").then((data) => {
      postChannel(client, config.DISCORD_JOB_CHANNEL, data, config.DISCORD_GUILD_ID); 
    });

    setInterval(() => {
      getLatestPost("querovagas23").then((data) => {
        postChannel(client, config.DISCORD_JOB_CHANNEL, data, config.DISCORD_GUILD_ID);
      });
    }, 1200000);
  },
};

export default event;
