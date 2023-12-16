"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event = {
    name: "interactionCreate",
    once: false,
    execute: (interaction) => {
        if (interaction.isCommand()) {
        }
    }
};
exports.default = event;
