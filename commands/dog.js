const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `dog`,
    description: `Sends a random dog image.`,
    guildOnly: false,
    args: false,
    selfAllowed: true,
    permLevel: 0,
    targeted: false,
    aliases: undefined,
    concatAfter: undefined,
    permsNeeded: "",
    main(msg, args, target, mutes, commands, guilds, ksoft) {
        ksoft.images.reddit("dogpictures", {removeNSFW: true, span: "day"}).then(res => {
            msg.channel.send(new MessageEmbed()
                .setColor([0, 255, 0])
                .setImage(res.url)
                .setTitle(res.post.title)
            );
        });
    }
}