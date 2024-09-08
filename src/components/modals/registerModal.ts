import { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel } from "discord.js";
import logger from "../../utils/beautyLog";
import prisma from "../../utils/prismadb"
import { certifyGuildConfig } from "../../utils/guildUtils";


module.exports = {
    data: {
        id: "register-modal"
    },
    async execute(interaction: any, client: Client) {
        try {
           
            if (!interaction.isModalSubmit()) return;

         
            const guildData = await certifyGuildConfig(interaction.guild);
            if (!guildData) {
                interaction.reply({ content: "Houve um erro ao enviar a sua solicitação de entrada: O servidor ainda será configurado para o recebimento de formulários!", ephemeral: true });
                return;
            }

         
            const formEntryConfig = await prisma.formEntry.findFirst({where: {guildId: interaction.guild.id}})
            
            if (!formEntryConfig || !formEntryConfig.formChannelId) {
                console.log(formEntryConfig)
                console.log(`Não foi possível encontrar o canal de texto com o ID!`)
                interaction.reply({ content: "Houve um erro ao enviar a sua solicitação de entrada: O canal de recebimento de formulários ainda não foi definido!", ephemeral: true });
                return;
            }

       
            const filterUserEntryChannel = interaction.guild.channels.cache.get(formEntryConfig.formChannelId) as TextChannel;
            if (!filterUserEntryChannel) {
                console.log(`Não foi possível encontrar o canal de texto com o ID ${formEntryConfig.formChannelId}!`)
                interaction.reply({ content: "Houve um erro ao enviar a sua solicitação de entrada: O canal de recebimento de formulários ainda não foi definido!", ephemeral: true });
                return;
            }

   
            const user = interaction.member;
            const name = interaction.fields.getTextInputValue("name");
            const socialMedia = interaction.fields.getTextInputValue("social_media");
            const inviteOrigin = interaction.fields.getTextInputValue("invite_origin");
            const intention = interaction.fields.getTextInputValue("intention");
            const age = interaction.fields.getTextInputValue("age");

          
            const data = {
                userId: user.id,
                name: name,
                social_media: socialMedia,
                invite_origin: inviteOrigin,
                intention: intention,
                age: age
            };

 
            const approveButton = new ButtonBuilder()
                .setCustomId("enter-guild-approve")
                .setLabel("Aprovar entrada")
                .setStyle(ButtonStyle.Primary);

            const declineButton = new ButtonBuilder()
                .setCustomId("enter-guild-decline")
                .setLabel("Recusar entrada")
                .setStyle(ButtonStyle.Danger);

     
            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(approveButton, declineButton);

      
            const embed = new EmbedBuilder()
                .setTitle(interaction.guild.name)
                .setDescription(`UserId: ${user}\n\n**Nome**: ${name}\n**Social Media**: ${socialMedia}\n**Origem do convite**: ${inviteOrigin}\n**Intenção**: ${intention}\n**Idade**: ${age}`)
                .setColor("DarkBlue")
                .setTimestamp();

       
            await filterUserEntryChannel.send({
                embeds: [embed],
                components: [row]
            });

          
            await interaction.reply({ content: `Obrigado por se cadastrar!`, ephemeral: true });
          

           

        } catch (error) {
            logger.error(`Erro ao processar solicitação de entrada: ${error}`);
        }
    }
};
