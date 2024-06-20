import { Events, GuildMember, TextChannel } from "discord.js";
import { BotEvent } from "../../types";
import logger from "../../utils/beautyLog";
import { ObjectId } from "bson";

const {certifyGuildConfig} = require("../../utils/guildUtils")

// Helper function to check if the custom status contains the specific terms
const containsInStatus = (status: string | null | undefined, terms: string[]): boolean => {
         return terms.some(term => status?.includes(term));  
        };


// Main event handler
const event: BotEvent = {
    name: Events.PresenceUpdate,
    once: false,
    active: true,
    execute: async (oldPresence, newPresence) => {
        // Ignorar update dos bots
        if (newPresence.user.bot) {
            return
        }
        const member = newPresence.member as GuildMember;
        if (!member || !member.presence) return;
        const newCustomStatus = member.presence.activities.find(activity => activity.name === "Custom Status")?.state;
        const oldCustomStatus = oldPresence?.member?.presence?.activities.find((activity: { name: string; }) => activity.name === "Custom Status")?.state;


        const guildData = await certifyGuildConfig(newPresence.guild);
        
        if(!guildData) {
            console.log("Guilda não cadastrada, aguarde um momento")
        }

      
        const GUILD_ID = guildData.guildId;
        const customStatusData = guildData.customStatusRoles
        console.log("Mudança em: " + newPresence.guild.name)
    

        customStatusData.forEach((customStatus: any) => {
            const { statusTerms, roleIds, warnChannelId } = customStatus;
            if (newPresence.guild.id !== GUILD_ID) return;
            const member = newPresence.member as GuildMember;
            if (!member || !member.presence) return;
            //const newCustomStatus = member.presence.activities.find(activity => activity.name === "Custom Status")?.state;
            //const oldCustomStatus = oldPresence?.member?.presence?.activities.find((activity: { name: string; }) => activity.name === "Custom Status")?.state;
            console.log(newCustomStatus)
            console.log(oldCustomStatus)
           roleIds.forEach((roleId: string) => {
            if (containsInStatus(newCustomStatus, statusTerms)) {
                console.log('Membro atualizou o cargo para um dos termos: ')
                statusTerms.forEach((term: string) => {
                    console.log(term)
                }
            )
                if (!member.roles.cache.has(roleId)) {
                    member.roles.add(roleId);
                    if(!warnChannelId) {
                        const warnChannel = member.guild.channels.cache.get(warnChannelId) as TextChannel;
                        if(warnChannel)  {
                            warnChannel?.send(`<@${member.id}> changed their custom status to "${newCustomStatus}"`);
    
                        }
                    }
                   
                    console.log(`Cargo adicionado a ${member.displayName} pelo status personalizado: ${newCustomStatus}`);
                }
            } else {
                if (member.roles.cache.has(roleId)) {
                    console.log("Membro possui o cargo, mas não possui algum dos termos")
                    member.roles.remove(roleId);

                    if(warnChannelId) {
                        const warnChannel = member.guild.channels.cache.get(warnChannelId) as TextChannel;
                        if(warnChannel)  {
                            warnChannel?.send(`<@${member.id}> changed their custom status to "${newCustomStatus}"`);
    
                        }
                    }
                    console.log(`Cargo removido de ${member.displayName} pelo status personalizado: ${newCustomStatus}`);
                }
            }
           })

            
        })
   
    }
        

    //     if (newPresence.guild.id !== GUILD_ID) return;

    //     const member = newPresence.member as GuildMember;

    //     if (!member || !member.presence) return;

        
    //     const newCustomStatus = member.presence.activities.find(activity => activity.name === "Custom Status")?.state;

    //     const oldCustomStatus = oldPresence?.member?.presence?.activities.find((activity: { name: string; }) => activity.name === "Custom Status")?.state;

    //     const hasRole = member.roles.cache.has(ROLE_ID);
    //     const warnChannel = member.guild.channels.cache.get(WARN_CHANNEL_ID) as TextChannel;

    //     if (containsNovaheaven(newCustomStatus)) {
    //         if (!hasRole) {
    //             await member.roles.add(ROLE_ID);
    //             warnChannel?.send(`<@${member.id}> changed their custom status to ${newCustomStatus}`);
    //             logger.info(`${newCustomStatus}`);
    //         }
    //     } else {
    //         if (hasRole) {
    //             await member.roles.remove(ROLE_ID);
    //             warnChannel?.send(`<@${member.id}> changed their custom status to ${newCustomStatus}`);
    //             logger.info(`Removed role from ${member.displayName} as they removed /novaheaven from their status.`);
    //         }
    //     }
    // }
}

module.exports = event