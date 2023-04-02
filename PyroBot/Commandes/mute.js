const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    
    name: 'mute',
    description: 'Mute un membre',
    category: "Modération",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à mute",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "temps",
            description: "Temps du mute",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "raison",
            description: "Raison du mute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        
        let user = args.getUser("membre")
        if(!user) return message.reply("Veuillez mentionner un membre.")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Ce membre n'existe pas.")

        let time = args.getString("temps")
        if(!time) return message.reply("Veuillez mentionner un temps.")
        if(isNaN(ms(time))) return message.reply("Veuillez mentionner un temps valide.")
        if(ms(time) > 24192000000) return message.reply("Ce temps est trop long.")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie.";

        if(message.user.id === user.id) return message.reply("Pourquoi Essaye tu de te mute?")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("NE OSE PAS MUTE LE PROPRIETAIRE.")
        if(!member.moderatable) return message.reply("Je ne peux pas mute ce membre.")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Nop!")
        if(member.isCommunicationDisabled()) return message.reply("Deja mute...")

        try {await user.send(`Tu a été mute du serveur ${message.guild.name} par ${message.user.tag} pendant ${time} pour la raison de \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a mute ${user.tag} pendant ${time} pour la raison de \`${reason}\``)
            
        await member.timeout(ms(time), reason)
    }
}