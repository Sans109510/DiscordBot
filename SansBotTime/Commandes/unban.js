const Discord = require("discord.js")
const { get } = require("http")

module.exports = {

    name: "unban",
    description: "Unban un utilisateur du serveur",
    category: "Modération",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "Membre à debantime",
            required: true,
            autocomplete: false            
        },
        {
            type: "string",
            name: "raison",
            description: "Raison du debantime",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {

            let user = args.getUser("utilisateur")
            if(!user) return message.reply("Veuillez mentionner un utilisateur")
            
            let reason = args.getString("raison")
            if(!reason) reason = "Aucune raison fournie"

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce utilisateur n'a pas été bantime")

            try {await user.send(`Tu as été debantime par ${message.user.tag} par ce que: \`${reason}\`.`)} catch (err) {}

            await message.reply(`${user.tag} a été debantime par ${message.user} pour la raison \`${reason}\`.`)

            await message.guild.members.unban(user, reason)

        } catch(err){

            return message.reply("Pas d'utilisateur") 
        }

        
    }
}