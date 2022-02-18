const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `hplevel`,
    description: `Displays the hypixel level of a user.`,
    guildOnly: false,
    args: true,
    selfAllowed: true,
    permLevel: 0,
    targeted: false,
    aliases: undefined,
    concatAfter: undefined,
    permsNeeded: undefined,
    main(msg, args, target) {
        let username = args[0];

        msg.channel.send(new MessageEmbed()
            .setImage(`https://gen.plancke.io/exp/${username}.png`)
            .setColor([0, 255, 0])
        )
    }
}