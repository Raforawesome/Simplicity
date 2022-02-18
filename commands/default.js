const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `help`,
    description: `Displays information about the bot and it's commands.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["h"],
    concatAfter: undefined,
    permsNeeded: "",
    main(msg, args, target) {

    }
}