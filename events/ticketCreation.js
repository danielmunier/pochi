const { Client, Events, ChannelType, PermissionFlagsBits, ActionRowBuilder, EmbedBuilder, ButtonBuilder} = require("discord.js")






module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {


        if(interaction.isButton()) {
            if(interaction.customId === "ticket_basic") {
                let channel_name = `ticket-${interaction.user.username}`
                let channel = interaction.guild.channels.cache.find(channel => channel.name === channel_name)
        
                if(channel) {
                    interaction.reply({content: `Você já tem um ticket aberto em ${channel}!`, ephemeral: true})
                } else {
                    
                 
                    
                    let category = interaction.channel.parent
                    
                    if(!category) category = null



                    interaction.guild.channels.create({
                        name: channel_name,
                        parent: category,
                        type: ChannelType.GuildText,  
                     
                    }).then((chat) => {
                        chat.permissionOverwrites.edit(interaction.guild.roles.everyone, {ViewChannel: false, SendMessages: false, ReadMessageHistory: false})
                        chat.permissionOverwrites.edit(interaction.user.id, {ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
 

                        interaction.reply({content: `${interaction.user.username}: Ticket criado em ${chat}!`, ephemeral: true})

                        let embed = new EmbedBuilder()
                        .setColor("Random")
                        .setTitle(`${interaction.guild.name} - Ticket de suporte`)
                        .setDescription(`${interaction.user} abriu um ticket! Aguarde um administrador responder!`)
                        
                        let close_button = new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                            .setCustomId("ticket_close")
                            .setEmoji("🔒")
                            .setStyle('Danger')
        
                        
                        )
                        
                        
        
                        chat.send({embeds: [embed], components: [close_button]}).then(m => {
                           
                        })
        
        
                    })
                }
            } else if (interaction.customId === "ticket_close") {
                interaction.reply({content: `O seu ticket será excluido em 5 segundos.`, ephemeral: true})
                if(interaction.channel.name.startsWith("ticket-")) {
                    try {
                        setTimeout(() => {
                            interaction.channel.delete().catch( e => {return})
        
                        }, 5000)
                    } catch(e) {
                        console.log(e)
                        return
                    }
                    
                }
            }
        }

    }
  };
  