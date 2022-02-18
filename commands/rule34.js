const { MessageEmbed } = require("discord.js");
const posts = require("rule34js").posts;

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
   name: `rule34`,
   description: `Sends a rule 34 image matching specified tags.`,
   guildOnly: false,
   args: true,
   selfAllowed: true,
   permLevel: 0,
   targeted: false,
   aliases: ["r34"],
   concatAfter: undefined,
   permsNeeded: "",
   main(msg, args, target, mutes, commands, guilds, ksoft) {
      if (!msg.channel.nsfw) {
         msg.channel.send(
            new MessageEmbed()
               .setColor([255, 0, 0])
               .setDescription("This channel is not marked NSFW!")
         );
         return;
      }

      posts({ tags: args, limit: 10000 }).then(
         (res) => {
            if (res.count == 0) {
               msg.channel.send(
                  new MessageEmbed()
                     .setColor([255, 0, 0])
                     .setDescription("No posts were found matching those tags.")
               );
               return;
            }

            let toPick = getRandomInt(0, res.count);
            //let post = res.posts[toPick];
            msg.channel.send(
               new MessageEmbed()
                  .setColor([0, 255, 0])
                  .setFooter(`Tags: ${res.posts[toPick].tags_parsed.join(", ")}\n\n${args.join(", ")}`)
                  .setImage(res.posts[toPick].file_url)
            );
         },
         () => {
            msg.channel.send(
               new MessageEmbed()
                  .setColor([255, 0, 0])
                  .setDescription("Request failed!")
            );
         }
      );
   },
};
