const { MessageEmbed } = require("discord.js")
const helpPages = {
    fun: `
    8ball - Gives a random traditional 8ball response.
	cat - Sends a random picture of a cat.
    dog - Sends a random picture of a dog.
    coinflip - Flips a coin and tells you the response.
    meme - Sends a random meme with title.
    dankmeme - Meme command but less normie.
    cute - Sends a cute image with title.
    wikihow - Sends a weird image with title from wikihow.
    `,
    moderation: `
        (ADMIN) ban [user] - Removes a user from the server until unbanned.
        (MOD) tempban [user] - Temporarily bans a user.
        (MOD) unban [userid] - Unbans a user.
        (MOD) kick [user] - Removes a user from the server, they can still rejoin.
        (MOD) purge [amount] - Deletes a specified amount of messages. (max 100)
        (MOD) mute [user] - Doesn't let user talk in this channel.
        (MOD) unmute [user] - Lets user talk again.
        (MOD) lock - Doesn't let users with default permissions talk in the channel.
        (MOD) unlock - Lets default permissions talk in the channel again.
	    (MOD) servermute [user] - Doesn't let user talk in all channels.
	    (MOD) unservermute [user] - Unmutes user in all channels.
        (MOD) setnick [user] [nick] - Sets [user]'s in guild nickname to [nick].
        (ADMIN) resetnicknames - Resets all nickanmes in the server.
        (ADMIN) hide - Hides the channel from default permissions.
        (ADMIN) unhide - Shows the channel to default permissions.
        (ADMIN) role add [user] [role] - Add [role] to [user].
        (ADMIN) role color [role] rgb [r] [g] [b] - Set [role]'s colour to the specified RGB values.
        (ADMIN) role color [role] hex [hex] - Set [role]'s colour to [hex].
        (ADMIN) role create [name] - Create a new role with the name [name].
        (ADMIN) role remove [user] [role] - Removes [role] from [user].
        (ADMIN) silencevc - Mutes everyone in your current vc.
        (ADMIN) unsilencevc - Unmutes everyone in your current vc.
        (ADMIN) deafenvc - Deafens everyone in your current vc.
        (ADMIN) undeafenvc - Undeafens everyone in your current vc.
    `,
    utility: `
        quote [messageid] - Searches the entire server for a message with message id, and embeds it.
        gquote [messageid] - Quotes a message from any server the bot is in (VERY SLOW).
	    roles - Displays all the roles in the server (not in order).
	    userinfo [user] - Displays information about the user from the Discord API.
	    serverinfo - Displays information about the server from the Discord API.
    `,
    hypixel: `
        hplevel [username] - Returns an image with the player's hypixel level.
    `,
    other: `
        invite - Links the bot invite.
    `,
    nsfw: `
        hentai - New hentai command
        ass - Take a WILD guess
        pussy - Fap to your screen while you sit in your crushing loneliness
        boobs - Big goth mommy gf big milkers
        nsfw - Sends a random nsfw image
        nsfwsub [subreddit] - Into some super kinky shit?  Put it here!
    `
}

module.exports = {
    name: `help`,
    description: `Displays information about the bot and it's commands.`,
    guildOnly: false,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["h"],
    concatAfter: undefined,
    permsNeeded: undefined,
    main(msg, args, target, mutes, cmds) {
        if (args[0]) {
            const cmd = cmds.get(args[0]);

            if (cmd) {
                msg.channel.send(new MessageEmbed().setDescription(`Name: ${cmd.name}\nDescription: ${cmd.description}\nGuild Only: ${cmd.guildOnly}\nTakes arguments: ${cmd.args}\nAliases: ${cmd.aliases.join(", ")}\nPermission needed: ${cmd.permsNeeded}\n`).setColor([0, 255, 0]))
            } else {
                msg.channel.send(new MessageEmbed().setDescription("[List of commands here](https://www.raforaweso.me/simplicity/commands)").setColor([0, 255, 0]))
            }
        } else {
            msg.channel.send(new MessageEmbed().setDescription("[List of commands here](https://www.raforaweso.me/simplicity/commands)").setColor([0, 255, 0]))
        }
        /*
        if (args[0] === undefined) {
            msg.channel.send(new MessageEmbed()
            .setDescription(`
                All commands that take a user argument will either 
                take a mentioned user, a partial or full server nickname, 
                or a partial or full username.

                Commands marked "Mod" or "Admin" require
                the "Mod" or "Admin" roles (no permissions needed) 
                respectively.

                Do ./help <page>

                **Help Types:**
                fun
                moderation
                utility
                hypixel
                other
            `)
            .setColor([0, 255, 0])
            )

        } else if (args[0] !== undefined) {
            //let embed = new MessageEmbed().setDescription(helpPages[args[0]]);
            for (const key of Object.keys(helpPages)) {
                if (key.search(args[0]) !== -1) {
                    msg.channel.send(new MessageEmbed().setDescription(helpPages[key]).setColor([0, 255, 0]));
                }
            }
        } else {
            msg.channel.send('error invalid')
        }
        */
    }
}