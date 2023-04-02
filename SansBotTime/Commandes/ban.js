const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "Ban un membre du serveur",
    category: "Modération",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à bantime",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "raison",
            description: "Raison du bantime",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Tu a essayer de BanTime un membre mais tu na pas réussie...")
            let member = message.guild.members.cache.get(user.id)
            
            let reason = args.getString("raison")
            if(!reason) reason = "encore Sans109510 qui ban un random...";

            if(message.user.id === user.id) return message.reply("Pourquoi veut tu te bannir?")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("POUQUOI OSE TU BAN LE CHEF DU SERVEUR?")
            if(member && !member.bannable) return message.reply("Desolé je ne peut pas bannir ce membre.")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Nop!")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà bantime.😂😂😂")

            try {await user.send(`Tu a été bantime du serveur ${message.guild.name} par ${message.user.tag} pour la raison de \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} a bantime ${user.tag} pour la raison de \`${reason}\``)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {

            return message.reply("Tu a essayer de BanTime un membre mais tu na pas réussie...")
        }
    }
}