const { MessageEmbed } = require("discord.js")
const ms = require('ms');

const struct = {

}

module.exports = {
    name: `mute`,
    description: `Doesn't let user talk in this channel.`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: true,
    aliases: ["m", "silence"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_MESSAGES",
    hierarchical: true,
    async main(msg, args, target, mutes) {
        let duration = args[1];
        let msdur;
        if (duration) msdur = ms(duration);

        if (!msdur) {
            msg.channel.createOverwrite(target.user.id, {"SEND_MESSAGES": false});
            msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`<@${target.user.id}> has been muted.`))
            return;
        }

        if (!struct[msg.guild.id]) {
            struct[msg.guild.id] = {};
            struct[msg.guild.id][msg.channel.id] = {};
            //console.log(msdur);
            struct[msg.guild.id][msg.channel.id][target.user.id] = [Date.now(), msdur, msg.channel.id, target.user.id];
        } else {
            //console.log(msdur);
            struct[msg.guild.id][msg.channel.id][target.user.id] = [Date.now(), msdur, msg.channel.id, target.user.id];
        }

        msg.channel.createOverwrite(target.user.id, {"SEND_MESSAGES": false})

        msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`<@${target.user.id}> has been muted for ${ms(msdur, { long: true })}.`))

        setTimeout(() => {
            if (msg.channel.permissionsFor(target.user.id).has('SEND_MESSAGES')) return;
            msg.channel.createOverwrite(target.user.id, {"SEND_MESSAGES": null})
            msg.channel.send(new MessageEmbed().setColor([255, 0, 255]).setDescription(`<@${target.user.id}> is no longer muted.`))
        }, msdur)

        mutes.set("mutes", struct);
    }
}

/*
mute keyv structure
{
    mutes: {
        guildid: {
            channelid: {
                userid: {start, duration}
            }
        }
    }
}
*/
