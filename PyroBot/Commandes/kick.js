const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Kick un membre du serveur",
    category: "Modération",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à kick",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "raison",
            description: "Raison du kick",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
      

        let user = args.getUser("membre") 
        if(!user) return message.reply("Tu a essayer de kick un membre mais tu na pas réussie...")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Qui?")
            
        let reason = args.getString("raison")
        if(!reason) reason = "Aucune Raison...";

        if(message.user.id === user.id) return message.reply("Pourquoi veut tu te kick?")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("POUQUOI OSE TU KICK LE CHEF DU SERVEUR?")
        if(member && !member.kickable) return message.reply("Desolé je ne peut pas kick ce membre.")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Nop!")

        try {await user.send(`Tu a été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison de \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a kick ${user.tag} pour la raison de \`${reason}\``)
            
        await member.kick(reason)
    
    }
}