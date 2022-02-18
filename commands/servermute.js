const { MessageEmbed } = require("discord.js")
const ms = require('ms');

const struct = {

}

module.exports = {
    name: `servermute`,
    description: `Doesn't let user talk in this server.`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: true,
    aliases: ["sm", "ssilence"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_MESSAGES",
    async main(msg, args, target, mutes) {
        let duration = args[1];
        let msdur;
        if (duration) msdur = ms(duration);
        
        if (!msdur) {
            msg.guild.channels.cache.each(channel => {
                if (channel.isText()) {
                    channel.createOverwrite(target.user.id, {"SEND_MESSAGES": false})
                }
            })
            msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`<@${target.user.id}> has been server muted.`))
            return;
        }

        if (!struct[msg.guild.id]) {
            struct[msg.guild.id] = {};
            struct[msg.guild.id][msg.channel.id] = {};
            //console.log(msdur);
            struct[msg.guild.id][msg.channel.id][target.user.id] = [Date.now(), msdur, msg.channel.id, target.user.id];
        } else {
            //console.log(msdur);
            struct[msg.guild.id][msg.channel.id][target.user.id] = [Date.now(), msdur, msg.channel.id, target.user.id];
        }
        
        msg.guild.channels.cache.each(channel => {
            if (channel.isText()) {
                channel.createOverwrite(target.user.id, {"SEND_MESSAGES": false})
            }
        })

        msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`<@${target.user.id}> has been server muted for ${ms(msdur, { long: true })}.`))

        setTimeout(() => {
            if (msg.channel.permissionsFor(target.user.id).has('SEND_MESSAGES')) return;
            msg.guild.channels.cache.each(channel => {
                if (channel.isText()) {
                    channel.createOverwrite(target.user.id, {"SEND_MESSAGES": null})
                }
            })
            msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`<@${target.user.id}> is no longer server muted.`))
        }, msdur)

        mutes.set("mutes", struct);
    }
}