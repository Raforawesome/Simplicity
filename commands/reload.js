const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `reload`,
    description: `Reloads a command (or adds it).`,
    guildOnly: false,
    args: true,
    selfAllowed: false,
    permLevel: 4,
    targeted: false,
    aliases: [],
    concatAfter: undefined,
    permsNeeded: [],
    main(msg, args) {
        let reload = args[1];
        let newcmd = false;
        const commandName = args[0].toLowerCase();

        if (reload && reload === "new") {
            newcmd = true;
        }

        if (!newcmd) {
            const command = msg.client.commands.get(commandName) || msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return msg.channel.send(new MessageEmbed().setDescription(`There is no command with name or alias ${commandName}!`).setColor([255, 255, 0]));

            delete require.cache[require.resolve(`./${command.name}.js`)];

            try {
                const newCommand = require(`./${command.name}.js`);
                msg.client.commands.set(newCommand.name, newCommand);
                msg.channel.send(new MessageEmbed().setDescription(`Command ${command.name} was reloaded!`).setColor([255, 255, 0]));
            } catch (error) {
                console.error(error);
                msg.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
            }
        } else {
            try {
                const newCommand = require(`./${commandName}.js`);
                msg.client.commands.set(newCommand.name, newCommand);
                msg.channel.send(new MessageEmbed().setDescription(`Command ${newCommand.name} was loaded!`).setColor([255, 255, 0]));
            } catch (error) {
                console.error(error);
                msg.channel.send(`There was an error while reloading a command \`${newCommand.name}\`:\n\`${error.message}\``);
            }
        }
    }
}