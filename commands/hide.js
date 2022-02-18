const { MessageEmbed } = require("discord.js")
const ms = require('ms');

module.exports = {
    name: `hide`,
    description: `Stops everyone from seeing this channel.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["h"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_CHANNELS",
    async main(msg, args, target, keyv) {
        let duration = args[0];
        let msdur;
        if (duration) msdur = ms(duration);

        msg.channel.overwritePermissions([
            {
                id: msg.guild.roles.everyone.id,
                deny: ['VIEW_CHANNEL']
            }
        ])
        msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`Channel is now hidden.`))


        if (msdur) {
            setTimeout(() => {
                if (msg.channel.permissionsFor(msg.guild.roles.everyone.id).has("VIEW_CHANNEL")) return;
                msg.channel.overwritePermissions([
                    {
                        id: msg.guild.roles.everyone.id,
                        allow: ['VIEW_CHANNEL']
                    }
                ])
                msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`Channel is now shown.`))
            }, msdur)
        }
    }
}