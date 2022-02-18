const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `pussy`,
    description: `Sends a random pussy image.`,
    guildOnly: false,
    args: false,
    selfAllowed: true,
    permLevel: 0,
    targeted: false,
    aliases: undefined,
    concatAfter: undefined,
    permsNeeded: "",
    main(msg, args, target, mutes, commands, guilds, ksoft) {
        if (msg.channel.type == "dm") {
            ksoft.images.reddit("godpussy", {removeNSFW: false, span: "day"}).then(res => {
                msg.channel.send(new MessageEmbed()
                    .setColor([0, 255, 0])
                    .setImage(res.url)
                    .setTitle(res.post.title)
                );
            });
        } else {
            if (!msg.channel.nsfw) {
                msg.channel.send(new MessageEmbed().setColor([255, 0, 0]).setDescription("This channel is not marked NSFW!"));
                return;
            };

            ksoft.images.reddit("godpussy", {removeNSFW: false, span: "day"}).then(res => {
                msg.channel.send(new MessageEmbed()
                    .setColor([0, 255, 0])
                    .setImage(res.url)
                    .setTitle(res.post.title)
                );
            });
        }
    }
}