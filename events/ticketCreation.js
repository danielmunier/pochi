const {
  Client,
  Events,
  ChannelType,
  PermissionFlagsBits,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ModalBuilder, TextInputBuilder, TextInputStyle 
} = require("discord.js");

function createTicket(interaction, type) {
      let channel_name = `ticket-${interaction.user.username}-${type}`;
      let channel = interaction.guild.channels.cache.find(
        (channel) => channel.name === channel_name
      );

      if (channel) {
        interaction.reply({
          content: `Você já tem um ticket aberto em ${channel}!`,
          ephemeral: true,
        });
      } else {
        let category = interaction.channel.parent;
        if (!category) category = null;

        interaction.guild.channels
          .create({
            name: channel_name,
            parent: category,
            type: ChannelType.GuildText,
          })
          .then((chat) => {
            chat.permissionOverwrites.edit(interaction.guild.roles.everyone, {
              ViewChannel: false,
              SendMessages: false,
              ReadMessageHistory: false,
            });
            chat.permissionOverwrites.edit(interaction.user.id, {
              ViewChannel: true,
              SendMessages: true,
              ReadMessageHistory: true,
            });

            interaction.reply({
              content: `${interaction.user.username}: Ticket criado em ${chat}!`,
              ephemeral: true,
            });

            let embed = new EmbedBuilder()
              .setColor("Random")
              .setTitle(`${interaction.guild.name} - Ticket de suporte`)
              .setDescription(
                `${interaction.user} abriu um ticket! Aguarde um administrador responder!`
              );

            let close_button = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("ticket_close")
                .setEmoji("🔒")
                .setStyle("Danger")
            );

            chat
              .send({ embeds: [embed], components: [close_button] })
              .then((m) => {});
          });
      }
    
}


module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {

    if(interaction.isStringSelectMenu()) {

      const selectedValue = interaction.values[0];

      switch (selectedValue) {
        case 'duvida':
          // Ação para quando "Tirar dúvidas" é selecionado
          interaction.reply({ content: `Para tirar dúvidas gerais sobre o servidor, utilize os tópicos de suporte em <#${'1051814496991203358'}>`, ephemeral: true });
          break;
    
        case 'report':
          // Ação para quando "Fazer uma denúncia" é selecionado
          createTicket(interaction, 'report')
          break;
    
        case 'sugestao':
          // Ação para quando "Enviar sugestão" é selecionado

              const modal = new ModalBuilder()
                .setCustomId(`myModal-${interaction.user.id}`)
                .setTitle('Formulário do Pochi');

              const sugestionForm = new TextInputBuilder()
                .setCustomId(`sugestionInput`)
                  // The label is the prompt the user sees for this input
                .setLabel("Digite sua sugestão aqui")
                  // Short means only a single line of text
                .setStyle(TextInputStyle.Paragraph);

              const firstActionRow = new ActionRowBuilder().addComponents(sugestionForm);
                modal.addComponents(firstActionRow)
                await interaction.showModal(modal)

                const filter = (interaction) => interaction.customId === `myModal-${interaction.user.id}`
                interaction.awaitModalSubmit({filter, time: 60_000}).then((modalInteraction) => {
                  const sugestion = modalInteraction.fields.getTextInputValue('sugestionInput')
                  const channel_sugestions_id = '1129969219358961744'
                  const channel_sugestions = interaction.guild.channels.cache.get(channel_sugestions_id || interaction.channel.id)
                  channel_sugestions.send({content: `Sugestão de ${interaction.user.username}[${interaction.user.id}]:
${sugestion}`})
                  modalInteraction.reply({content: 'Sugestão enviada com sucesso!', ephemeral: true})
                })
                
          break;
    
        case 'bug':
          // Ação para quando "Reportar bug" é selecionado
          createTicket(interaction, 'bug')
          break;
    
        default:
          // Ação padrão para valores não reconhecidos
          interaction.reply({ content: 'Opção inválida', ephemeral: true });
          break;

        


      }
    }

    if (interaction.customId === "ticket_close") {
      interaction.reply({
        content: `O seu ticket será excluido em 5 segundos.`,
        ephemeral: true,
      });
      if (interaction.channel.name.startsWith("ticket-")) {
        try {
          setTimeout(() => {
            interaction.channel.delete().catch((e) => {
              return;
            });
          }, 5000);
        } catch (e) {
          console.log(e);
          return;
        }
      }
    }




   
  },
};
