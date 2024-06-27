import { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel } from "discord.js";
import axios from "axios";
import logger from "../../utils/beautyLog";
import { certifyGuildConfig } from "../../utils/guildUtils";
import { FormEntryConfig, IFormEntryConfig } from "../../database/schemas/formEntrySchema";
import { GuildConfig, IGuildConfig } from "../../database/schemas/guildSchema";

module.exports = {
    data: {
        id: "register-modal"
    },
    async execute(interaction: any, client: Client) {
        try {
            // Verifica se a interação é um modal submit
            if (!interaction.isModalSubmit()) return;

            // Certifica a configuração da guilda
            const guildData: IGuildConfig | null = await certifyGuildConfig(interaction.guild);
            if (!guildData) {
                interaction.reply({ content: "Houve um erro ao enviar a sua solicitação de entrada: O servidor ainda será configurado para o recebimento de formulários!", ephemeral: true });
                return;
            }

            // Verifica se o canal para envio dos formulários está configurado
            const formEntryConfig: IFormEntryConfig | null = await FormEntryConfig.findOne({ guildId: interaction.guild.id });
            
            if (!formEntryConfig || !formEntryConfig.formChannelId) {
                console.log(formEntryConfig)
                console.log(`Não foi possível encontrar o canal de texto com o ID!`)
                interaction.reply({ content: "Houve um erro ao enviar a sua solicitação de entrada: O canal de recebimento de formulários ainda não foi definido!", ephemeral: true });
                return;
            }

            // Busca o canal de texto para envio dos formulários
            const filterUserEntryChannel = interaction.guild.channels.cache.get(formEntryConfig.formChannelId) as TextChannel;
            if (!filterUserEntryChannel) {
                console.log(`Não foi possível encontrar o canal de texto com o ID ${formEntryConfig.formChannelId}!`)
                interaction.reply({ content: "Houve um erro ao enviar a sua solicitação de entrada: O canal de recebimento de formulários ainda não foi definido!", ephemeral: true });
                return;
            }

            // Obtém os dados do usuário submetido no modal
            const user = interaction.member;
            const name = interaction.fields.getTextInputValue("name");
            const socialMedia = interaction.fields.getTextInputValue("social_media");
            const inviteOrigin = interaction.fields.getTextInputValue("invite_origin");
            const intention = interaction.fields.getTextInputValue("intention");
            const age = interaction.fields.getTextInputValue("age");

            // Monta os dados para envio ao Google Sheets (ou outra API)
            const data = {
                userId: user.id,
                name: name,
                social_media: socialMedia,
                invite_origin: inviteOrigin,
                intention: intention,
                age: age
            };

            // Cria os botões de aprovação e recusa
            const approveButton = new ButtonBuilder()
                .setCustomId("enter-guild-approve")
                .setLabel("Aprovar entrada")
                .setStyle(ButtonStyle.Primary);

            const declineButton = new ButtonBuilder()
                .setCustomId("enter-guild-decline")
                .setLabel("Recusar entrada")
                .setStyle(ButtonStyle.Danger);

            // Constrói a linha de ação com os botões
            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(approveButton, declineButton);

            // Constrói o embed com os dados submetidos
            const embed = new EmbedBuilder()
                .setTitle(interaction.guild.name)
                .setDescription(`UserId: ${user}\n\n**Nome**: ${name}\n**Social Media**: ${socialMedia}\n**Origem do convite**: ${inviteOrigin}\n**Intenção**: ${intention}\n**Idade**: ${age}`)
                .setColor("DarkBlue")
                .setTimestamp();

            // Envia o embed e os botões para o canal de formulários
            await filterUserEntryChannel.send({
                embeds: [embed],
                components: [row]
            });

            // Verifica se há uma URL do Google Sheets configurada na guilda
             // Responde ao usuário que o registro foi concluído
            await interaction.reply({ content: `Obrigado por se cadastrar!`, ephemeral: true });
            const sheetdb = guildData.sheetdb.url;
            if (!sheetdb) return;

            // Envia os dados para o Google Sheets via API
            axios.post(sheetdb, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SHEETDB_TOKEN}`
                }
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.error(error);
            });

           

        } catch (error) {
            logger.error(`Erro ao processar solicitação de entrada: ${error}`);
        }
    }
};
