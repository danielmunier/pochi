import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomStatusRole extends Document {
    statusTerms: string[];
    roleIds: string[];
    warnChannelId: string | null;
}

const customStatusRoleSchema: Schema = new Schema({
    guildId: {
        type: String,
        required: true,
        description: "ID do servidor onde o cargo de status personalizado está associado"
    },
    statusTerms: {
        type: [String],
        required: true,
        description: "Lista de termos de status personalizados a serem detectados"
    },
    roleIds: {
        type: [String],
        required: true,
        description: "Lista de IDs de cargos atribuídos ao membro quando eles têm o status personalizado"
    },
    warnChannelId: {
        type: String,
        required: false,
        description: "ID do canal onde avisos sobre mudanças de status personalizado são enviados"
    }
});

export const CustomStatusRole = mongoose.model<ICustomStatusRole>('CustomStatusRole', customStatusRoleSchema);
