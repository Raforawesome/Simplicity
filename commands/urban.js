const urban = require('relevant-urban');
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `urban`,
    description: `Looks up word on the Urban Dictionary.`,
    guildOnly: false,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["ud"],
    concatAfter: 0,
    permsNeeded: "",
    main(msg, args, target, mutes, commands, guilds, ksoft, rgb) {
        let u = urban(args[0])

        u.then(res => {
            msg.channel.send(new MessageEmbed()
                .setColor(rgb)
                .setDescription(res.definition.replace(/\[/g, "").replace(/\]/g, ""))
                .setTitle(res.word)
                .setFooter(`Example:\n${res.example.replace(/\[/g, "").replace(/\]/g, "")}`)
            )
        })
        /*
        urban(args[0]).first(res => {
            msg.channel.send(new MessageEmbed()
                .setDescription(res.definition.replace(/[\[\]]/g, ""))
                .setTitle(args[0])
                .setFooter(`Example: ${res.example.replace(/[\[\]]/g, "")}`)
                .setColor([0, 255, 0])
            )
        }, err => {
            msg.channel.send(new MessageEmbed()
                .setDescription("Request failed!")
                .setColor([255, 0, 0])
            ) 
        })
        */
    }
}