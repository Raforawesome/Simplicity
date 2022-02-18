const { MessageEmbed } = require("discord.js")

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports = {
    name: `coinflip`,
    description: `Flips a coin.`,
    guildOnly: false,
    args: false,
    selfAllowed: true,
    permLevel: 0,
    targeted: false,
    aliases: ["cf"],
    concatAfter: undefined,
    permsNeeded: "",
    main(msg, args, target, mutes, commands, guilds, ksoft) {
        if (getRandomInt(1, 3) == 1) {
            msg.channel.send(new MessageEmbed()
                .setColor([0, 255, 0])
                .setDescription("Heads!")
            );
        } else {
            msg.channel.send(new MessageEmbed()
                .setColor([0, 255, 0])
                .setDescription("Tails!")
            );
        }
    }
}