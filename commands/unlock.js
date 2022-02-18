const { MessageEmbed } = require("discord.js")
const ms = require('ms');

module.exports = {
    name: `unlock`,
    description: `Lets everyone talk in this channel.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["ul", "open"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_CHANNELS",
    async main(msg, args, target, keyv) {
        msg.channel.createOverwrite(msg.guild.roles.everyone.id, {"SEND_MESSAGES": null})
        msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`Channel is now unlocked.`))
    }
}

/*
mute keyv structure
{
    mutes: {
        guildid: {
            channelid: {
                userid: {start, duration}
            }
        }
    }
}
*/