const { MessageEmbed } = require("discord.js")
const ms = require('ms');

module.exports = {
    name: `unmute`,
    description: `Lets user talk in this channel.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: true,
    aliases: ["um", "unsilence"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_MESSAGES",
    async main(msg, args, target, keyv) {
        msg.channel.createOverwrite(target.user.id, {"SEND_MESSAGES": null})
        msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`<@${target.user.id}> is no longer muted.`))
    }
}
