const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `gquote`,
    description: `Quotes a message from any server the bot is in (SLOW).`,
    guildOnly: false,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: [""],
    concatAfter: undefined,
    permsNeeded: "",
    main(msg, args, target, mutes, commands, guilds) {
        let message;
        
        guilds.cache.each(guild => {
            guild.channels.cache.each(channel => {
                if (channel.isText()) {
                    let fetched = channel.messages.fetch(args[0]).then(mfetched => {
                        message = mfetched;
                        msg.channel.send(new MessageEmbed()
                        .setDescription(`${message.content}\n\n[Link](${message.url}) (Server: ${guild.name})`)
                        .setAuthor(message.author.tag, message.author.avatarURL({format: 'png', size: 128}))
                        .setColor([0, 255, 0])
                    );
                    return;
                    }, err => {});
                }
            })
        });
        
        /*
        if (message != undefined) {
            
        } else {
            msg.channel.send(new MessageEmbed()
                .setDescription("Couldn't find this message.")
                .setColor([255, 0, 0])
            );
        }
        */
        
    }
}