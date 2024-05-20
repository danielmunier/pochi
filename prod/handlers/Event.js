"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const beautyLog_1 = __importDefault(require("../util/beautyLog"));
module.exports = (client) => {
    let eventsDir = (0, path_1.join)(__dirname, "../events");
    for (const eventFile of (0, fs_1.readdirSync)(eventsDir)) {
        if (!eventFile.endsWith(".ts"))
            return;
        let event = require(`${eventsDir}/${eventFile}`).default;
        if (event === undefined) {
            beautyLog_1.default.error(`[ERROR] ${eventFile} is undefined`);
        }
        if (event.active || typeof event.active == "undefined") {
            beautyLog_1.default.info(`[ACTIVADED] ${eventFile}`);
            event.once
                ? client.once(event.name, (...args) => event.execute(...args))
                : client.on(event.name, (...args) => event.execute(...args));
        }
        else {
            beautyLog_1.default.warning(`[DEACTIVADED] ${eventFile}`);
        }
    }
};
