"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event = {
    name: "ready",
    once: true,
    execute: (client) => {
        console.log("Logged in as Rimuru");
    }
};
exports.default = event;
