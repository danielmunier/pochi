const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');

async function createTicketChannel(guild, category, user) {
  const ticketChannelName = `ticket-${user.id}`;
  const ticketChannelOptions = {
    name: ticketChannelName,
    type: ChannelType.GuildText,
    parent: category,
    reason: 'Canal de ticket',
    permissionOverwrites: [
      {
        id: user.id,
        allow: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
    ],
  };

  const ticketChannel = await guild.channels.create(ticketChannelOptions);
  console.log('Canal do ticket criado:', ticketChannel.name);
  return ticketChannel;
}

function createWelcomeEmbed(guild) {
  return new EmbedBuilder()
    .setTitle(`Bem-vindo ao ${guild.name}`)
    .setDescription(`Obrigado por entrar em contato com o suporte do ${guild.name}. Por favor, descreva com detalhes o seu problema e aguarde um administrador responder.`)
    .setThumbnail(guild.iconURL({ dynamic: true }));
}

async function sendTicketWelcomeMessage(channel, embed) {
  await channel.send({ embeds: [embed] });
}

module.exports = {
  data: new SlashCommandBuilder().setName('ticket').setDescription('Ticket system'),


  async execute(interaction) {
  // Verifica se a pessoa que executou o comando possui a permissão de gerenciar o servidor    
    if (!interaction.member.permissions.has('MANAGE_GUILD')) {
      console.log('Sem permissão');
      interaction.reply({ content: 'Sem permissão', ephemeral: true });
      return;
    }

    const categoryName = 'tickets';
    const category = interaction.guild.channels.cache.find(
      (channel) => channel.name === categoryName && channel.type === ChannelType.GuildCategory
    );

    let ticketChannel;
    if (!category) {
      await interaction.guild.channels.create({ name: categoryName, type: ChannelType.GuildCategory });
      ticketChannel = await createTicketChannel(interaction.guild, category, interaction.user);
    } else {
      ticketChannel = await createTicketChannel(interaction.guild, category, interaction.user);
    }

    const welcomeEmbed = createWelcomeEmbed(interaction.guild);
    await sendTicketWelcomeMessage(ticketChannel, welcomeEmbed);

    let commandChannel = interaction.channel;

    let embed = new EmbedBuilder()
      .setColor('Grey')
      .setDescription('Crie um ticket aqui')
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) });

    const open_button = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('ticket').setStyle('Primary').setLabel('Abrir ticket')
    );

    interaction.reply({ embeds: [embed], components: [open_button] });

    const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

    collector.on('collect', async (i) => {
      try {
        if (i.customId === 'ticket') {
          await i.reply({ content: `Canal do ticket: ${ticketChannel}`, ephemeral: true });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
};
