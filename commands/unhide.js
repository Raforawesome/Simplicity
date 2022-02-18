const { MessageEmbed } = require("discord.js")
const ms = require('ms');

module.exports = {
    name: `unhide`,
    description: `Lets everyone see this channel.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["uh"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_CHANNELS",
    async main(msg, args, target, keyv) {
        msg.channel.overwritePermissions([
            {
                id: msg.guild.roles.everyone.id,
                allow: ['VIEW_CHANNEL']
            }
        ])
        msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`Channel is now shown.`))
    }
}