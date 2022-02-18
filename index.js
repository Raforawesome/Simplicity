"use strict";
// Simplicity V2 discord bot
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// master branch
var Discord = require("discord.js");
var MessageEmbed = require("discord.js").MessageEmbed;
var Collection = require("discord.js").Collection;
var KSoftClient = require('@ksoft/api').KSoftClient;
var ksoft = new KSoftClient('7ff810599f061e6896d6caac50795528f378ad75');
var ytdl = require("ytdl-core");
var fs = require("fs");
var ms = require('ms');
var slogChannel, jlogChannel, mlogChannel;
var client = new Discord.Client({ fetchAllMembers: true });
client.commands = new Collection();
var prefix = "./";
var commandFiles = fs.readdirSync("./commands").filter(function (file) { return file.endsWith(".js"); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var cfile = commandFiles_1[_i];
    var cmd = require("./commands/".concat(cfile));
    client.commands.set(cmd.name, cmd);
}
// main: NzAyNzY2MTU0NjMyMTM0Njc2.XqEz_A.CeD1wsAzv6oZ349VzkfOyXEfEiM
// PTB: NzA0MDI2Mzc1NzM2MTMxNTk0.XqXJqA.BKRiCCcMkvfDeXNw1r1mJTd4Q6Q
client.login('NzA0MDI2Mzc1NzM2MTMxNTk0.XqXJqA.BKRiCCcMkvfDeXNw1r1mJTd4Q6Q');
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
var findMember = function (arg, mem) {
    if (!mem)
        return;
    var guild = mem.guild;
    var toReturn;
    guild.members.cache.each(function (member) {
        if (member.displayName.includes(arg) || member.user.username.includes(arg)) {
            toReturn = member;
            return member;
        }
    });
    return toReturn;
};
client.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var args, cmd_1, cmdFile, target, cca, tocc, newArray, permsHas, roles;
    return __generator(this, function (_a) {
        if (msg.content.startsWith(prefix)) {
            args = msg.content.slice(prefix.length).trim().split(/ +/);
            cmd_1 = args.shift().toLowerCase();
            cmdFile = client.commands.get(cmd_1) || client.commands.find(function (cf) { return cf.aliases && cf.aliases.includes(cmd_1); });
            target = msg.mentions.members.first() || findMember(args[0], msg.member);
            //console.log('starting', cmd);
            //client.commands.forEach(thing => console.log(thing))
            if (!cmdFile) {
                msg.channel.send(new MessageEmbed().setDescription("Invalid command!").setColor([255, 0, 0]));
                return [2 /*return*/];
            }
            ;
            //console.log('found file');
            if (cmdFile.args && !args.length) {
                msg.channel.send(new MessageEmbed().setDescription(cmdFile.description).setColor([255, 0, 0]));
                return [2 /*return*/];
            }
            //console.log('has args');
            if (cmdFile.targeted && !target) {
                msg.channel.send(new MessageEmbed().setDescription("This command expected a target, but you didn't specify one.").setColor([255, 0, 0]));
                return [2 /*return*/];
            }
            if (cmdFile.hierarchical && msg.member != msg.guild.owner && target && target.roles.highest.position >= msg.member.roles.highest.position) {
                msg.channel.send(new MessageEmbed().setDescription("You cannot do this to <@".concat(target.user.id, ">.")).setColor([255, 0, 0]));
                return [2 /*return*/];
            }
            //console.log('target valid');
            if (cmdFile.guildOnly === true && !msg.channel.guild) {
                msg.channel.send(new MessageEmbed().setDescription("Sorry, this command only works in servers!").setColor([255, 0, 0]));
                return [2 /*return*/];
            }
            if (cmdFile.concatAfter != undefined) {
                cca = parseFloat(cmdFile.concatAfter);
                tocc = args.slice(cca);
                args.splice(cca);
                newArray = args.push(tocc.toString().replace(/,/g, " "));
            }
            if (!cmdFile.selfAllowed && target === msg.member) {
                msg.channel.send(new MessageEmbed().setDescription("You can't do that to yourself!").setColor([255, 0, 0]));
                return [2 /*return*/];
            }
            if (cmdFile.permsNeeded) {
                permsHas = msg.channel.permissionsFor(msg.author);
                if (!permsHas || !permsHas.has(cmdFile.permsNeeded)) {
                    msg.channel.send(new MessageEmbed().setDescription("You don't have permission to do this! Missing ".concat(cmdFile.permsNeeded, ".")).setColor([255, 0, 0]));
                    return [2 /*return*/];
                }
            }
            //console.log('done in guild');
            if (cmdFile.permLevel > 0) {
                roles = msg.member.roles;
                if (cmdFile.permLevel === 1) {
                    if (!roles.cache.some(function (role) { return role.name.toLowerCase().search("mod") !== -1; }) && !roles.cache.some(function (role) { return role.name.toLowerCase().search("admin") !== -1; })) {
                        msg.channel.send(new MessageEmbed().setDescription("You don't have permission to do this!").setColor([255, 0, 0]));
                        return [2 /*return*/];
                    }
                }
                else if (cmdFile.permLevel === 2) {
                    if (!roles.cache.some(function (role) { return role.name.toLowerCase().search("admin") !== -1; })) {
                        msg.channel.send(new MessageEmbed().setDescription("You don't have permission to do this!").setColor([255, 0, 0]));
                        return [2 /*return*/];
                    }
                }
                else if (cmdFile.permLevel === 3) {
                    if (msg.guild.owner != msg.member) {
                        msg.channel.send(new MessageEmbed().setDescription("You don't have permission to do this!").setColor([255, 0, 0]));
                        return [2 /*return*/];
                    }
                }
                else if (cmdFile.permLevel === 4) {
                    if (msg.author.id != '168704403400949761' && msg.author.id != '215558097530388481') {
                        msg.channel.send(new MessageEmbed().setDescription("You don't have permission to do this!").setColor([255, 0, 0]));
                        return [2 /*return*/];
                    }
                }
            }
            //console.log('has perms');
            try {
                cmdFile.main(msg, args, target, [], client.commands, client.guilds, ksoft, [getRandomInt(1, 255), getRandomInt(1, 255), getRandomInt(1, 255)]);
            }
            catch (err) {
                console.log(err);
                msg.channel.send(new MessageEmbed().setDescription("An unexpected error occurred!"));
            }
        }
        return [2 /*return*/];
    });
}); });
client.on('ready', function () {
    client.channels.fetch('795437788547383339').then(function (channel) { return slogChannel = channel; });
    client.channels.fetch('866849002317545493').then(function (channel) { return jlogChannel = channel; });
    client.channels.fetch('866849040636575744').then(function (channel) { return mlogChannel = channel; });
    console.log("Logged in as ".concat(client.user.tag, "!"));
    client.user.setPresence({
        status: "online",
        activity: {
            name: "./help",
            type: "WATCHING"
        }
    });
});
/*
setInterval(async () => {
    const struct = await mutes.get("mutes")

    if (struct) {
        for (const cobj in struct) {
            console.log('cobj')
            for (const tobj in cobj) {
                const start = tobj[0];
                const duration = tobj[1];
                const cid = tobj[2];
                const uid = tobj[3];

                if (!start) {
                    console.log('invalid start')
                    return;
                } else if (!duration) {
                    console.log('invalid duration')
                    return;
                } else if (!cid) {
                    console.log('invalid cid')
                    return;
                } else if (!uid) {
                    console.log('invalid uid')
                    return;
                }

                console.log(`checking ${uid}`);
                if (Date.now() - start >= duration) {
                    console.log('mute is up')
                    const channel = client.channels.fetch(cid);

                    if (channel) {
                        channel.overwritePermissions([
                            {
                                id: uid,
                                allow: ["SEND_MESSAGES"]
                            }
                        ])

                        msg.channel.send(new MessageEmbed().setColor([0, 255, 0]).setDescription(`<@${uid}> is no longer muted.`));
                    } else {
                        console.log("Invalid mute channel!")
                    }
                }
            }
        }
    } else {
        console.log("no struct!");
    }
}, 1000)
*/
/*
command file example:

const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `help`,
    description: `Displays information about the bot and it's commands.`,
    guildOnly: true,
    args: false,
    selfAllowed: false,
    permLevel: 0,
    targeted: false,
    aliases: ["h"],
    concatAfter: undefined,
    permsNeeded: "",
    async main(msg, args, target, mutes, commands, guilds, ksoft, clr) {

    }
}
*/
// logging
client.on('channelCreate', function (c) {
    if (!slogChannel)
        return;
    slogChannel.send(new MessageEmbed()
        .setColor([0, 255, 0])
        .setTitle("Channel Created")
        .setAuthor(c.guild.name, c.guild.iconURL({ format: 'png' }))
        .setDescription("<#".concat(c.id, "> was created in `").concat(c.guild.name, "`")));
});
client.on('channelDelete', function (c) {
    if (!slogChannel)
        return;
    slogChannel.send(new MessageEmbed()
        .setColor([255, 0, 0])
        .setTitle("Channel Deleted")
        .setAuthor(c.guild.name, c.guild.iconURL({ format: 'png' }))
        .setDescription("".concat(c.name, " was deleted in `").concat(c.guild.name, "`")));
});
client.on('guildCreate', function (g) {
    if (!jlogChannel)
        return;
    jlogChannel.send(new MessageEmbed()
        .setColor([0, 255, 0])
        .setTitle("Server Joined")
        .setAuthor(g.name, g.iconURL({ format: 'png' }))
        .setDescription("Bot has joined `".concat(g.name, "`.")));
});
client.on('guildDelete', function (g) {
    if (!jlogChannel)
        return;
    jlogChannel.send(new MessageEmbed()
        .setColor([255, 0, 0])
        .setTitle("Server Left")
        .setAuthor(g.name, g.iconURL({ format: 'png' }))
        .setDescription("Bot has left `".concat(g.name, "`.")));
});
client.on('messageDelete', function (m) {
    if (!mlogChannel)
        return;
    if (!m.author)
        return;
    mlogChannel.send(new MessageEmbed()
        .setColor([255, 0, 0])
        .setTitle("Message Deleted")
        .setAuthor(m.author.tag, m.author.avatarURL({ format: 'png' }))
        .setDescription("".concat(m.content, "\n\nDeleted in <#").concat(m.channel.id, ">"))
        .setFooter(m.guild.name, m.guild.iconURL({ format: 'png' })));
});
client.on('messageUpdate', function (m, newm) {
    if (!mlogChannel)
        return;
    if (!m.author)
        return;
    mlogChannel.send(new MessageEmbed()
        .setColor([255, 255, 0])
        .setTitle("Message Edited")
        .setAuthor(m.author.tag, m.author.avatarURL({ format: 'png' }))
        .setDescription("Before:\n".concat(m.content, "\n\nAfter:\n").concat(newm.content, "\n\nEdited in <#").concat(m.channel.id, ">"))
        .setFooter(m.guild.name, m.guild.iconURL({ format: 'png' })));
});
