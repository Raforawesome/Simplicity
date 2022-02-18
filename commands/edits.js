const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `edits`,
    description: `MISSING`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 4,
    targeted: false,
    aliases: ["ed"],
    concatAfter: undefined,
    permsNeeded: "",
    async main(msg, args, target, mutes, commands, guilds, ksoft, clr) {
		msg.guild.channels.cache.each(channel => {
			if (channel.isText()) {
				channel.messages.fetch(args[0]).then(m => {
					let edits = ""
					m.edits.forEach(me => {
						edits = edits + `${me.content}\n\n`
					})
					msg.channel.send(new MessageEmbed()
						.setTitle("Edits for Message")
						.setDescription(`${edits}[link](${m.url})`)
						.setColor(clr)
						.setAuthor(m.author.tag, m.author.avatarURL())
					)
				}, err => {})
			}
		})
    }
}