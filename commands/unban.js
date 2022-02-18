const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `unban`,
    description: `Unbans a user from the server.`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["ub"],
    concatAfter: 1,
    permsNeeded: "BAN_MEMBERS",
    main(msg, args, target) {
        const id = args[0]
        const reason = args[1]

        try {
            msg.guild.members.unban(id, `${reason + ` by ${msg.author.username}`} (${msg.author.id})` || `Simplicity unban by ${msg.author.username} (${msg.author.id})`)
            msg.channel.send(new MessageEmbed().setDescription(`<@${id}> has been unbanned.`).setColor([255, 0, 255]))
        } catch(err) {
            msg.channel.send(new MessageEmbed().setColor([255, 0, 0]).setDescription("Unban failed.  Do I have permission?  Are they already unbanned?"))
        }
    }
}