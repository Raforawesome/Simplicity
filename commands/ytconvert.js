const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = {
    name: `ytconvert`,
    description: `Converts a video URL to a direct video link.`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["ytc"],
    concatAfter: 0,
    permsNeeded: "",
    async main(msg, args, target, mutes, commands, guilds, ksoft, clr) {
        let url = args[1];
        
    }
}