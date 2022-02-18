const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `kick`,
    description: `Removes a user from the server, they can still rejoin.`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: true,
    aliases: ["k"],
    concatAfter: 1,
    permsNeeded: "KICK_MEMBERS",
    hierarchical: true,
    main(msg, args, target) {
        const reason = args[1]

        if (target.kickable) {
            target.kick(`${reason + ` by ${msg.author.username}`} (${msg.author.id})` || `Simplicity kick by ${msg.author.username} (${msg.author.id})`)
            msg.channel.send(new MessageEmbed().setDescription(`<@${target.user.id}> has been kicked.`).setColor([255, 0, 255]))
            //msg.channel.send(`DEBUG MODE: kicking <@${target.user.id}> for ${reason + ` by ${msg.author.username} (${msg.author.id})` || `Simplicity kick by ${msg.author.username} (${msg.author.id})`}`)
        } else {
            msg.channel.send(new MessageEmbed().setColor([255, 0, 0]).setDescription("Can't kick target!  Are they above me?  Do I have permission?"))
        }
    }
}
