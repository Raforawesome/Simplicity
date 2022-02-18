const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `embed`,
    description: `Makes an embed with the specified fields (title color image footer description).`,
    guildOnly: true,
    args: true,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["em"],
    concatAfter: 4,
    permsNeeded: "MANAGE_MESSAGES",
    async main(msg, args, target, mutes, commands, guilds, ksoft, clr) {
		// ./embed title color image footer description
		if (args.length != 5) {
			msg.channel.send(new MessageEmbed()
				.setDescription("You have an invalid amount of arguments!")
				.setColor([255, 0, 0])
			)
			return
		}
		let newArgs = []
		let embed = new MessageEmbed()

		let mapping = {
			1: "setTitle",
			2: "setColor",
			3: "setImage",
			4: "setFooter",
			5: "setDescription"
		}

		let index = 0
		args.forEach(arg => {
			index++;
			if (arg != "none") {
				if (index != 2 && index != 3) {
					embed[mapping[index]](args[index - 1])
				} else if (index == 2) {
					embed[mapping[index]](args[index - 1].toUpperCase())
				} else {
					let input = args[index - 1]
					input.replace("<", "")
					input.replace(">", "")
					embed[mapping[index]](input)
				}
			}
		})

		try {
			msg.channel.send(embed)
		} catch(err) {
			msg.channel.send(new MessageEmbed()
			.setDescription("An error occurred sending this embed!")
			.setColor([255, 0, 0]))
		}
    }
}