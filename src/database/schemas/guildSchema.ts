import mongoose, { Schema, Document } from 'mongoose';

export interface IGuildConfig extends Document {
    guildId: string;
    customStatusRoles: mongoose.Schema.Types.ObjectId[];
    formEntryConfig: mongoose.Schema.Types.ObjectId;
    ticketConfig: mongoose.Schema.Types.ObjectId;
    lobbyConfig: mongoose.Schema.Types.ObjectId;
    sheetdb: {
        url: string | null;
    };
}

const guildConfigSchema: Schema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
        description: "ID da guilda"
    },
    customStatusRoles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomStatusRole' }],
    formEntryConfig: { type: mongoose.Schema.Types.ObjectId, ref: 'FormEntryConfig' },
    ticketConfig: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketConfig' },
    lobbyConfig: { type: mongoose.Schema.Types.ObjectId, ref: 'LobbyConfig' },
    sheetdb: {
        url: {
            type: String,
            required: false,
            description: "URL da API do SheetDB para a guilda"
        }
    }
});

export const GuildConfig = mongoose.model<IGuildConfig>('GuildConfig', guildConfigSchema);
