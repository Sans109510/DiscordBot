const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    
    name: 'unmute',
    description: 'Unmute un membre',
    category: "Modération",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à unmute",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "raison",
            description: "Raison du unmute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        
      let user = args.getUser("membre");
      if(!user) return message.reply("Veuillez mentionner un membre à unmute.")
      let member = message.guild.members.cache.get(user.id)
      if(!member) return message.reply("Veuillez mentionner un membre.")

      let reason = args.getString("raison")
      if(!reason) reason = "Aucune raison fournie.";

      if(!member.moderatable) return message.reply("Non!")
      if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("NON!")
      if(!member.isCommunicationDisabled()) return message.reply("Il est pas Mute LOL!")

      try {await user.send(`Vous avez été unmute par ${message.user.tag} parce que \`${reason}\`.`)} catch(err) {}

      await message.reply(`${user.tag} a été unmute par ${message.user.tag} parce que \`${reason}\`.`)

      await member.timeout(null, reason)

    }
}