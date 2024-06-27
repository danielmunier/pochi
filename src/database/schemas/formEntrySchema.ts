import mongoose, { Schema, Document } from 'mongoose';

export interface IFormEntryConfig extends Document {
    formChannelId: string | null;
    rolesMemberApproved: string[];
    rolesVerification: string[];
}

const formEntryConfigSchema: Schema = new Schema({
    guildId: {
        type: String,
        required: true,
        description: "ID do servidor onde os formulários de entrada são enviados"
    },
    formChannelId: {
        type: String,
        required: false,
        description: "ID do canal onde os formulários de entrada são enviados"
    },
    rolesMemberApproved: [
        {
            type: String,
            required: false,
            description: "IDs dos cargos dos membros aprovados"
        }
    ],
    rolesVerification: [
        {
            type: String,
            required: false,
            description: "IDs dos cargos de verificação"
        }
    ]
});

export const FormEntryConfig = mongoose.model<IFormEntryConfig>('FormEntryConfig', formEntryConfigSchema);
