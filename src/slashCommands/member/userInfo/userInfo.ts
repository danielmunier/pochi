import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, SlashCommandUserOption } from "discord.js"
import { SlashCommand } from "../../../types";



const command : SlashCommand = {
     command: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get information about a user on this server.")
    .addUserOption(option =>
			option
      .setName('user')
      .setDescription('The member to info')
      .setRequired(false))
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
,
    execute: async interaction => {

        const user = interaction.options.getUser("user") || interaction.user
        const member = await interaction.guild?.members.fetch(user.id) 
        if(!member) return interaction.reply("Member not found")
        const icon = user.displayAvatarURL()

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setAuthor({name: "Pochi"})
        .setThumbnail(icon)
        .addFields({name: "Member", value: `${user}`, inline:false})
        .addFields({name: "Roles", value: `${member?.roles.cache.map(role => role).join(' ')}`, inline: true})
        .addFields({name: "Joined Discord", value: `${user.createdAt.toLocaleString()}`, inline:true})
        .addFields({name: "Joined Server", value: `${member?.joinedAt?.toLocaleString()}`, inline:true})
        interaction.reply({embeds: [embed]})
        
    },
    cooldown: 10
}

export default command