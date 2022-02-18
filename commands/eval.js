const { MessageEmbed } = require("discord.js")
let toPrint = "";
let print = str => {
    toPrint = `${toPrint}\n${str}`
}

module.exports = {
    name: `eval`,
    description: `Evaluates JavaScript code.`,
    guildOnly: false,
    args: true,
    selfAllowed: false,
    permLevel: 4,
    targeted: false,
    aliases: ["exec", "ev", "ex", "execute", "evaluate"],
    concatAfter: 0,
    permsNeeded: undefined,
    main(msg, args) {
        toPrint = "";
        const output = eval(args[0]);
        msg.channel.send(new MessageEmbed().setColor([255, 255, 0]).setDescription(`\`\`\`js\n${output}\n\n${toPrint}\n\`\`\``))
    }
}