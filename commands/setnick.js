const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `setnick`,
    description: `Sets a user's nickname in this server.`,
    guildOnly: true,
    args: true,
    selfAllowed: true,
    permLevel: 0,
    targeted: true,
    aliases: ["name", "sn", "nick"],
    concatAfter: 1,
    permsNeeded: "MANAGE_NICKNAMES",
    hierarchical: true,
    main(msg, args, target) {
        target.setNickname(args[1]);
    }
}
