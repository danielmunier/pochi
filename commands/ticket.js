const {
  ApplicationCommandType,
  PermissionFlagsBits,
  ActionRow,
  ActionRowBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Cria um ticket de suporte"),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      interaction.reply({
        content: "Você não tem permissão para usar este comando!",
        ephemeral: true,
      });
      return;
    }

    let channel = interaction.options.getChannel("canal");
    if (!channel) channel = interaction.channel;

    let embed_ticket = new EmbedBuilder()
      .setColor("Random")
      /* .setTitle(`${interaction.guild.name} - Ticket`) */
      .setDescription(
        `Bem-vindo à Central de Ajuda do Lotus Club!
        Aqui, você encontrará todas as respostas para suas dúvidas e poderá entrar em contato com nossa equipe de suporte do Lotus Club.
        
        Para garantir uma experiência tranquila, recomendamos que você leia cuidadosamente as opções disponíveis abaixo. Estamos aqui para ajudar e faremos o possível para resolver qualquer problema que você possa enfrentar.
        
        Fique à vontade para explorar as opções abaixo e encontrar a assistência que melhor atenda às suas necessidades.
   
    `
      )
      .setAuthor({
        name: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
     
      const select = new StringSelectMenuBuilder()
      .setCustomId('starter')
    /* 
    let button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("ticket_basic")
        .setEmoji("🎫")
        .setStyle("Primary")
        , components: [button] 
    );
 */
    interaction.reply({ embeds: [embed_ticket] });
  },
};
