const { MessageEmbed } = require("discord.js")
const ms = require('ms');

module.exports = {
    name: `lock`,
    description: `Stops everyone from talking in this channel.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["l", "close"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_CHANNELS",
    async main(msg, args, target, keyv) {
        let duration = args[1];
        let msdur;
        if (duration) msdur = ms(duration);

        msg.channel.createOverwrite(msg.guild.roles.everyone.id, {"SEND_MESSAGES": false})
        msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`Channel is now locked.`))

        if (msdur) {
            setTimeout(() => {
                if (msg.channel.permissionsFor(msg.guild.roles.everyone.id).has("SEND_MESSAGES")) return;
                msg.channel.createOverwrite(msg.guild.roles.everyone.id, {"SEND_MESSAGES": null})
                msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`Channel is now unlocked.`))
            })
        }
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