const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `find`,
    description: `Finds a user.`,
    guildOnly: true,
    args: true,
    selfAllowed: true,
    permLevel: 4,
    targeted: true,
    aliases: [],
    concatAfter: undefined,
    permsNeeded: [],
    main(msg, args, target) {
        let permLevel = 0;
        const roles = target.roles

        if (roles.cache.some(role => role.name.toLowerCase().search("mod") !== -1)  && !roles.cache.some(role => role.name.toLowerCase().search("admin") !== -1)) {
            permLevel = 1;
        }
        if (roles.cache.some(role => role.name.toLowerCase().search("admin") !== -1)) {
            permLevel = 2;
        }
        if (msg.guild.owner === target) {
            permLevel = 3;
        }
        if (target.user.id === '168704403400949761') {
            permLevel = 4;
        }
        

        msg.channel.send(new MessageEmbed().setDescription(`${target.user.username}\n\nPermission Level: ${permLevel}`));
    }
}