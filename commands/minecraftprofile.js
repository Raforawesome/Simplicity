const { MessageEmbed } = require("discord.js")
const http = require('https')
const axios = require('axios')

module.exports = {
    name: `minecraftprofile`,
    description: `Displays information a minecraft username.`,
    guildOnly: false,
    args: true,
    selfAllowed: true,
    permLevel: 0,
    targeted: false,
    aliases: ["mcprofile", "mcp"],
    concatAfter: 0,
    permsNeeded: "",
    async main(msg, args, target, mutes, commands, guilds, ksoft, clr) {
        const username = args[0]
        axios(`https://api.mojang.com/users/profiles/minecraft/${username}`).then(async function (res) {
        let result = res.data

        let uuid = result.id
        let history = await axios(`https://api.mojang.com/user/profiles/${uuid}/names`)
        let historyString = ""

        history.data.forEach(obj => {
          if (obj.changedToAt != undefined) {
            historyString = historyString + `${obj.name.replace("_", "\\_")} (Changed to on ${new Date(obj.changedToAt).toDateString()})\n`
          } else {
            historyString = historyString + `${obj.name}\n`
          }
        })

        msg.channel.send(new MessageEmbed()
          .setTitle(`Minecraft Profile for ${username}`)
          .setDescription(`Name History:\n${historyString}`)
          .setAuthor(username, `https://crafatar.com/avatars/${uuid}?size=256&default=MHF_Steve&overlay=true`)
          .setThumbnail(`https://crafatar.com/renders/body/${uuid}?size=256&default=MHF_Steve&overlay=true`)
          .setFooter(`UUID: ${uuid}`)
          .setColor(clr))
      }).catch(err => msg.channel.send(new MessageEmbed().setDescription("An error occurred!  Is that a valid username?").setColor([255, 0 ,0])))
    }
}
