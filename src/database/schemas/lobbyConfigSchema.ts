import mongoose, { Schema, Document } from 'mongoose';

export interface ILobbyConfig extends Document {
    lobby_command_image: string | null;
}

const lobbyConfigSchema: Schema = new Schema({
    guildId: {
        type: String,
        required: true,
        description: "ID da guilda onde o lobby da guilda está configurado"
    },
    lobby_command_image: {
        type: String,
        required: false,
        description: "URL da imagem do lobby da guilda"
    }
});

export const LobbyConfig = mongoose.model<ILobbyConfig>('LobbyConfig', lobbyConfigSchema);
