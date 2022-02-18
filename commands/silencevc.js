const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `silencevc`,
    description: `Servermutes everyone in the VC.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["svc"],
    concatAfter: undefined,
    permsNeeded: "MUTE_MEMBERS",
    main(msg, args, target) {
        if (msg.member.voice.channel) {
            let channel = msg.member.voice.channel;
            let members = channel.members;

            members.each(member => {
                member.voice.setMute(true);
            })

            msg.channel.send(new MessageEmbed().setDescription(`Muted everyone in ${channel.name}.`).setColor([0, 255, 0]));
        } else {
            msg.channel.send(new MessageEmbed().setDescription("You aren't in a voice channel!").setColor([255, 0, 0]));
            return;
        }
    }
}