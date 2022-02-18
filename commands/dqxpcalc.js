const { MessageEmbed } = require("discord.js")

let calclvlxp = target => {
    let toreturn = 84
    for (let i = 2; i < target; i++) {
        toreturn = toreturn * 1.13 + 0.5
    }
    return Math.floor(toreturn + 0.5)
}

module.exports = {
    name: `dqxpcalc`,
    description: `Calculates the xp to reach a desired level for Dungeon Quest.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["h"],
    concatAfter: undefined,
    permsNeeded: "",
    async main(msg, args, target, mutes, commands, guilds, ksoft, clr) {
        let [currentlvl, targetlvl, currentxp] = args
        currentlvl = Number.parseInt(currentlvl)
        targetlvl = Number.parseInt(targetlvl)
        currentxp = Number.parseInt(currentxp)
        currentxp = currentxp || 0

        let totalXP
    }
}
