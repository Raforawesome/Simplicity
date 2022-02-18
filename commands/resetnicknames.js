const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `resetnicknames`,
    description: `Sets all usernames to default in this server.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["rn"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_SERVER",
    main(msg, args, target) {
        msg.guild.members.cache.each(member => {
            member.setNickname("");
        })
    }
}