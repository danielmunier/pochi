import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction, Client, Message, ModalSubmitInteraction, PermissionResolvable, SlashCommandBuilder } from "discord.js";


export interface ClientWithEvents extends Client {
  }

export interface SlashCommand {
    command: SlashCommandBuilder,
    execute: (interaction : ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteractionn) => void,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
    cooldown?: number
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
        cooldowns: Collection<string, number>,
        handleEvents: () => Promise<void>;
        handleCommands: () => Promise<void>;

    }
}
