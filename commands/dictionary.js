const { MessageEmbed } = require("discord.js")
const axios = require('axios')

module.exports = {
    name: `define`,
    description: `Defines a word in a specified language (en, es, etc.).`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["def", "dictionary", "dict", "d"],
    concatAfter: undefined,
    permsNeeded: "",
    async main(msg, args, target, mutes, commands, guilds, ksoft, clr) {
        let lang = args[0]
        let word = args[1]
        axios(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}/`).then(res => {
            let def = res.data[0]

            let meanings = ""
            def.meanings.forEach(meaning => {
                m = meaning.definitions[0]
                meanings = meanings + `${m.definition}\nExample: ${m.example}\n${m.synonyms ? "Synonyms: " : ""}${m.synonyms ? m.synonyms.join(', ') : ""}\n\n`
            })

            msg.channel.send(new MessageEmbed()
                .setTitle(def.word)
                .setDescription(meanings)
                .setColor(clr)
            )
        })
    }
}
