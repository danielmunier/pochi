import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction, Message, ModalSubmitInteraction, PermissionResolvable, SlashCommandBuilder } from "discord.js";

export interface SlashCommand {
    command: SlashCommandBuilder,
    execute: (interaction : ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteractionn) => void,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
    cooldown?: number // in seconds
}


export interface Command {
    name: string,
    execute: (message: Message, args: Array<string>) => void,
    permissions: Array<PermissionResolvable>,
    aliases: Array<string>,
    cooldown?: number,
}

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}