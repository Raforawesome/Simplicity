const { MessageEmbed } = require("discord.js")
const ms = require('ms');

module.exports = {
    name: `unservermute`,
    description: `Lets user talk in this server.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: true,
    aliases: ["usm", "unssilence"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_MESSAGES",
    async main(msg, args, target, keyv) {
        msg.guild.channels.cache.each(channel => {
            if (channel.isText()) {
                channel.createOverwrite(target.user.id, {"SEND_MESSAGES": null})
            }
        })
        msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`<@${target.user.id}> is no longer server muted.`))
    }
}
