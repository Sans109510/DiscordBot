const Discord = require("discord.js")

module.exports = {

    name: "setstatus",
    description: "Statue du bot.",
    category: "Administration",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    options: [
        {
            type: "string",
            name: "activité",
            description: "Activité du bot.",
            required: true,
            autocomplete: true
        },
        {
            type: "string",
            name: "status",
            description: "Status du bot.",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "lien",
            description: "URL du stream(Twitch).",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

       let activity = args.getString("activité")
       if(activity !== "Listening" && activity !== "Playing" && activity !== "Competing" && activity !== "Watching" && activity !== "Streaming") return message.reply("Auto complete sert a quoi a ton avie?")

       let status = args.getString("status")
        
       if(activity === "Streaming" && args.getString("lien") === null) return message.reply("Indique une url Twitch")
       if(activity === "Streaming" && !args.getString("lien").match(new RegExp(/((http(s)?:\/\/)?(www\.)?twitch\.tv\/.*)/))) return message.reply("Indique une url Twitch")
       if(activity === "Streaming") await bot.user.setActivity(status, {type: Discord.ActivityType[activity], url: args.getString("lien")})
       else await bot.user.setActivity(status, {type: Discord.ActivityType[activity]})
       await message.reply({content: "Status mis à jour !", ephemeral: true})
    }
}

