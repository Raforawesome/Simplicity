const { MessageEmbed } = require("discord.js")

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let responses = ["It is certain.", "Without a doubt.", "You may rely on it.", "Yes, definitely.", "It is decidedly so.", "As I see it.", "Yes.", "Most likely.", "Yes.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Better not tell you now.", "Ask again later.", "Cannot predict now.", "Concentrate and ask again.", "Don’t count on it", "Outlook not so good", "My sources say no", "Very doubtful", "My reply is no"];

module.exports = {
    name: `8ball`,
    description: `8ball response.`,
    guildOnly: false,
    args: false,
    selfAllowed: true,
    permLevel: 0,
    targeted: false,
    aliases: ["8b"],
    concatAfter: undefined,
    permsNeeded: "",
    main(msg, args, target, mutes, commands, guilds, ksoft) {
        msg.channel.send(new MessageEmbed()
                .setColor([0, 255, 0])
                .setDescription(responses[getRandomInt(0, responses.length)])
            );
    }
}