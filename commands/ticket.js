const { ApplicationCommandType, PermissionFlagsBits, ActionRow, ActionRowBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Cria um ticket de suporte'),

  async execute(interaction) {
    if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)){
      interaction.reply({content: 'Você não tem permissão para usar este comando!', ephemeral: true})
      return 
    }

    let channel = interaction.options.getChannel("canal")
    if(!channel) channel = interaction.channel


  let embed_ephemeral = new EmbedBuilder()
  .setColor("Grey")
  .setDescription("Gerando painel de ticket...")

    let embed_ticket = new EmbedBuilder()
    .setColor("Random")
    /* .setTitle(`${interaction.guild.name} - Ticket`) */
    .setDescription(`🚨 Link de convite: https://discord.gg/lotusclub/
    ✉ Aguarde um administrador responder ✉
    
    🔽 Clique na reação abaixo para abrir um ticket 🔽
    `)
    .setImage('https://imgur.com/U4Gdrsi.gif')
    .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})})
  


  let button = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("ticket_basic")
    .setEmoji("🎫")
    .setStyle('Primary')

  )

  interaction.reply({embeds: [embed_ephemeral], ephemeral: true}).then(() => {
    channel.send({embeds: [embed_ticket], components: [button]})
  })


}}