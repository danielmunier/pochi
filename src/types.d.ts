import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction, Message, ModalSubmitInteraction, PermissionResolvable, SlashCommandBuilder } from "discord.js";



export interface SlashCommand {
    command: SlashCommandBuilder,
    execute: (interaction : ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteractionn) => void,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
    cooldown?: number // in seconds
}

export interface instagramUser {
    username: string,
    profileIconURL: string,
}

export interface instagramPost {
    shortcode: string,
    owner: instagramUser,
    description: string,
    timestamp: number,
    thumbnail: string,
    url: string,

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
    active?:  boolean | true,
    execute: (...args?) => void
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>
    }
}
