"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
console.log("[Handler] Loading events...");
module.exports = (client) => {
    let eventsDir = (0, path_1.join)(__dirname, "../events");
    for (const eventFile of (0, fs_1.readdirSync)(eventsDir)) {
        if (!eventFile.endsWith(".ts"))
            return;
        console.log("[Handler] Event " + eventFile + " loaded");
        let event = require(`${eventsDir}/${eventFile}`).default;
        if (event === undefined) {
            console.log(event);
        }
        event.once
            ? client.once(event.name, (...args) => event.execute(...args))
            : client.on(event.name, (...args) => event.execute(...args));
    }
};
