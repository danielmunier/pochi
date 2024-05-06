import { Client, Events, GuildMember, Typing } from "discord.js";
import { BotEvent } from "../types";
import logger from "../util/beautyLog";





// detect changes in every member. Like description and profile image
const event: BotEvent = {
    name: Events.PresenceUpdate,
    once: false,
    active: true,
    execute: async (oldPresence, newPresence) => {
        if(newPresence.guild.id === "1209632813792628746"){
            if(newPresence?.guild == null) return;
            if(oldPresence?.guild == null) return;
            if(newPresence?.member == null) return;
            if(oldPresence?.member == null) return;             
            
            const member = newPresence.member as GuildMember;
            const oldMember = oldPresence.member as GuildMember;

            if(member.presence == null) return;
            if(oldMember.presence == null) return;
            if(member.presence.activities.length === 0) return;
           if(member.presence.activities[0].name === "Custom Status") {

                const customStatus = member.presence.activities[0].state;
                logger.info(`Member ${member.displayName} changed his custom status to ${customStatus}`);
                if(customStatus?.includes("/novaheaven") || customStatus?.includes("discord.gg/novaheaven")){
                    logger.info(`${customStatus}`);
                }
            }

           
        /*     if(member.presence.status !== oldMember.presence.status){
                logger.info(`Member ${member.displayName} changed his status to ${oldMember.presence.status}`);
            }
            if(member.displayName !== oldMember.displayName){
                logger.info(`Member ${member.displayName} changed his name to ${oldMember.displayName}`);
            }
            if(member.displayAvatarURL() !== oldMember.displayAvatarURL()){
                logger.info(`Member ${member.displayName} changed his avatar to ${oldMember.displayAvatarURL()}`);
            }
            if(member.user.bot){
                logger.info(`Member ${member.displayName} changed his bot status to ${oldMember.user.bot}`);
            } */
        }
        }
    }
       
         
    





export default event;