const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `currencyconvert`,
    description: `Converts currencies.`,
    guildOnly: false,
    args: true,
    selfAllowed: true,
    permLevel: 0,
    targeted: false,
    aliases: ["cc", "cconvert", "moneyconvert", "mconvert"],
    concatAfter: undefined,
    permsNeeded: "",
    main(msg, args, target, mutes, commands, guilds, ksoft) {
        let value = args[0];
        let from = args[1];
        let to = args[2];

        if (!value || !from || !to) {
            msg.channel.send(new MessageEmbed()
            .setColor([255, 0, 0])
            .setDescription("You are missing an argument!")
        ); 
        }

        let val = parseFloat(value);

        ksoft.kumo.convert(val, from, to).then(res => {
            msg.channel.send(new MessageEmbed()
                .setColor([0, 255, 0])
                .setDescription(`${val} ${from} is ${res.pretty}.`)
            );
        }, err => {
            msg.channel.send(new MessageEmbed()
                .setColor([255, 0, 0])
                .setDescription(`Invalid values!`)
            );
        });
    }
}