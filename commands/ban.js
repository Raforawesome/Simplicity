const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: `ban`,
    description: `Prevents a user from joining the server until unbanned, for an optional amount of days.`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: true,
    aliases: ["b"],
    concatAfter: undefined,
    permsNeeded: "BAN_MEMBERS",
    hierarchical: true,
    main(msg, args, target) {
        const reason = args[1];
        const duration = args[2];
        let msdur;
        if (duration) msdur = ms(duration);

        if (target.bannable) {
            target.ban({reason: `${reason + ` by ${msg.author.username}`} (${msg.author.id})` || `Simplicity ban by ${msg.author.username} (${msg.author.id})`})
            msg.channel.send(new MessageEmbed().setDescription(`<@${target.user.id}> has been banned.`).setColor([255, 0, 255]))

            if (msdur) {
                setTimeout(() => {
                    msg.guild.members.unban(target.user.id)
                    msg.channel.send(new MessageEmbed().setDescription(`<@${target.user.id}> has been unbanned.`).setColor([255, 0, 255]))
                }, msdur)
            }
            //msg.channel.send(`DEBUG MODE: banning <@${target.user.id}> for ${reason + ` by ${msg.author.username} (${msg.author.id})` || `Simplicity ban by ${msg.author.username} (${msg.author.id})`}`)
        } else {
            msg.channel.send(new MessageEmbed().setColor([255, 0, 0]).setDescription("Can't ban target!  Are they above me?  Do I have permission?"))
        }
    }
}
