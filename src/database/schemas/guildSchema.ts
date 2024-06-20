const mongoose = require('mongoose');

const guildConfigSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
        description: "ID da guilda"
    },
    customStatusRoles: [{
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
    }],
    formEntryConfig: {
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
        ]
        
    },
    ticketConfig: {
        ticketCategoryId: {
            type: String,
            required: false,
            description: "ID da categoria onde os canais de tickets serão criados"
        }
    },
    lobbyConfig: {
        lobby_command_image: {
            type: String,
            required: false,
            description: "URL da imagem do lobby da guilda"
        },
        
    },
    sheetdb: {
        url: {
            type: String,
            required: false,
            description: "URL da API do SheetDB para a guilda"
        }
    }
});

module.exports = mongoose.model('GuildConfig', guildConfigSchema);
