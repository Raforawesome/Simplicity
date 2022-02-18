const { MessageEmbed } = require("discord.js")

const findMember = (arg, mem) => {
    if (!mem) return;
    let guild = mem.guild
    let toReturn;

    guild.members.cache.each(member => {
        if (member.displayName.includes(arg) || member.user.username.includes(arg)) {
            toReturn = member
            return member
        }
    })

    return toReturn
}

module.exports = {
    name: `purge`,
    description: `Deletes messages specified by amount or user.`,
    guildOnly: true,
    args: true,
    selfAllowed: true,
    permLevel: 0,
    targeted: false,
    aliases: ["p", "clear", "c"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_MESSAGES",
    main(msg, args) {
        let target = msg.mentions.members.first();
        if (parseFloat(args[0]) && !target) {
            msg.channel.bulkDelete(parseFloat(args[0]) + 1);
        } else if (!parseFloat(args[0]) && target) {
            let amount = parseFloat(args[1]);
            console.log(amount, target.displayName);
            let msgArray = [];
            let messages = msg.channel.messages.fetch({limit: amount + 1 || 21})
                .then(mc => {
                    mc.each(m => {
                        if (m.author === target.user) {
                            msgArray.push(m)
                        }
                    })
                    msg.channel.bulkDelete(msgArray)
                })
            
        } else {
            msg.channel.send(new MessageEmbed().setColor([255, 0, 0]).setDescription("An unexpected error occurred."));
        }
    }
}