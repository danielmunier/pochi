const { ApplicationCommandType, PermissionFlagsBits, ActionRow, ActionRowBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js');
const config = require('../config.js');

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
  .setTitle("Lotus Club - Ticket de suporte")
  .setDescription(`🚨 Link de convite do Lotus Club: https://discord.gg/lotusclub/
  ✉ Aguarde um administrador responder ✉
  
  🔽 Clique na reação abaixo para abrir um ticket 🔽
  `)
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