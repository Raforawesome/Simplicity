const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const role = require("./role");

module.exports = {
    name: `findrole`,
    description: `Finds a role.`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: [],
    concatAfter: 0,
    permsNeeded: [],
    main(msg, args, target) {
        let permLevel = 0;
        let foundRole;
        msg.guild.roles.cache.each(role => {
            if (role.name.includes(args[0])) {
                foundRole = role;
            }
        })

        if (foundRole) {
            msg.channel.send(new MessageEmbed().setDescription(`${foundRole.name}\n\Position: ${foundRole.position}`));
        }
    }
}