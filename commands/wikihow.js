const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `wikihow`,
    description: `Sends a random funny image from WikiHow.`,
    guildOnly: false,
    args: false,
    selfAllowed: true,
    permLevel: 0,
    targeted: false,
    aliases: undefined,
    concatAfter: undefined,
    permsNeeded: "",
    main(msg, args, target, mutes, commands, guilds, ksoft) {
        ksoft.images.wikihow().then(res => {
            msg.channel.send(new MessageEmbed()
                .setColor([0, 255, 0])
                .setImage(res.url)
                .setTitle(res.article.title)
                .setDescription(`[Link](${res.article.link})`)
            );
        });
    }
}