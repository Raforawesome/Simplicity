const { MessageEmbed } = require("discord.js")

module.exports = {
   name: `avatar`,
   description: `Sends a full scale version of a user's avatar.`,
   guildOnly: true,
   args: false,
   selfAllowed: true,
   permLevel: 0,
   targeted: true,
   aliases: ["av", "pfp"],
   concatAfter: undefined,
   permsNeeded: "",
   hierarchical: false,
   main(msg, args, target, mutes, commands, guilds, ksoft) {
		msg.channel.send(new MessageEmbed()
			.setImage(target.user.avatarURL({format: 'png', dynamic: true, size: 512}))
			.setColor([0, 255, 0])
			.setDescription(`[16](${target.user.avatarURL({format: 'png', dynamic: true, size: 16})}) | [32](${target.user.avatarURL({format: 'png', dynamic: true, size: 32})}) | [64](${target.user.avatarURL({format: 'png', dynamic: true, size: 64})}) | [128](${target.user.avatarURL({format: 'png', dynamic: true, size: 128})}) | [256](${target.user.avatarURL({format: 'png', dynamic: true, size: 256})}) | [512](${target.user.avatarURL({format: 'png', dynamic: true, size: 512})}) | [1024](${target.user.avatarURL({format: 'png', dynamic: true, size: 1024})}) | [2048](${target.user.avatarURL({format: 'png', dynamic: true, size: 2048})}) | [4096](${target.user.avatarURL({format: 'png', dynamic: true, size: 4096})})`)
		)
   }
}
