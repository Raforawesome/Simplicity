const { MessageEmbed } = require("discord.js")
const ms = require('ms');
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
const findRole = (guild, toMatch) => {
    let toReturn;
    guild.roles.cache.each(role => {
        if (role.name.includes(toMatch)) {
            toReturn = role;
            return role;
        }
    })
    return toReturn;
}

module.exports = {
    name: `role`,
    description: `Container for all the role subcommands.`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["r"],
    concatAfter: undefined,
    permsNeeded: "MANAGE_ROLES",
	hierarchical: true,
    main(msg, args, targeet) {
        let mode = args[0];
        let target = msg.mentions.members.first() || findMember(args[1], msg.member);

        if (target) {
            if (mode === "add") {
                let concatAfter = 2;
                if (concatAfter) {
                    let newargs = args.slice(0, concatAfter)
                    args = newargs.concat(args.splice(concatAfter).join(" "))
                }
                let toadd = args[2];
                let role = findRole(msg.guild, toadd);

                if (role) {
                    target.roles.add(role);
                    msg.channel.send(new MessageEmbed().setColor([0, 255, 0]).setDescription(`Added ${role.name} to <@${target.user.id}>.`).setColor([255, 0, 255]));
                }
            } else if (mode === "tempadd") {
                let concatAfter = 3;
                if (concatAfter) {
                    let newargs = args.slice(0, concatAfter)
                    args = newargs.concat(args.splice(concatAfter).join(" "))
                }
                let duration = args[2];
                let toadd = args[3];
                let role = findRole(msg.guild, toadd);
                let msdur = ms(duration);

                if (!msdur) {
                    msg.channel.send(new MessageEmbed().setColor([0, 255, 0]).setDescription(`That is not a valid duration!.`).setColor([255, 0, 0]));
                    return;
                }

                if (role) {
                    target.roles.add(role);
                    msg.channel.send(new MessageEmbed().setColor([0, 255, 0]).setDescription(`Added ${role.name} to <@${target.user.id}> for ${ms(msdur, {long: true})}.`));

                    setTimeout(() => {
                        //if (!target.roles.cache.has(role)) return;
                        target.roles.remove(role);
                        msg.channel.send(new MessageEmbed().setDescription(`Removed ${role.name} from <@${target.user.id}>.`).setColor([255, 0, 255]));
                    }, msdur)
                }
            } else if (mode === "remove") {
                let concatAfter = 2;
                if (concatAfter) {
                    let newargs = args.slice(0, concatAfter)
                    args = newargs.concat(args.splice(concatAfter).join(" "))
                }
                let toadd = args[2];
                let role = findRole(msg.guild, toadd);

                if (role) {
                    target.roles.remove(role);
                    msg.channel.send(new MessageEmbed().setDescription(`Removed ${role.name} from <@${target.user.id}>.`).setColor([255, 0, 255]));
                }
            } else if (mode === "color") {

            }
        } else {
            let role = findRole(msg.guild, args[1]);
            if (role) {
                if (mode === "color") {
                    let submode = args[2];

                    if (submode === "rgb") {
                        let r = parseFloat(args[3]);
                        let b = parseFloat(args[4]);
                        let g = parseFloat(args[5]);

                        if (!r || !g || !b) {
                            msg.channel.send(new MessageEmbed().setColor([0, 255, 0]).setDescription(`Invalid RGB!.`).setColor([255, 0, 0]));
                            return;
                        }

                        role.setColor([r, g, b]);
                        msg.channel.send(new MessageEmbed().setDescription(`Set ${role.name}'s color to ${r, g, b}.`).setColor([255, 0, 255]));

                    } else if (submode === "hex") {
                        let hex = args[3];
                        role.setColor(hex);
                        msg.channel.send(new MessageEmbed().setDescription(`Set ${role.name}'s color to ${hex}.`).setColor([255, 0, 255]));
                    }
                }
            }
        }
    }
}