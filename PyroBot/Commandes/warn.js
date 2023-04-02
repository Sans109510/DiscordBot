const Discord = require("discord.js")

module.exports = {
    
    name: 'warn',
    description: 'warn un membre',
    category: "Modération",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a warn",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "raison",
            description: "La raison du warn",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Veuillez mentionner un membre")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Veuillez mentionner un membre")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie"

        if(message.user.id === user.id) return message.reply("Pourquoi veut tu te warn?")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("POUQUOI OSE TU WARN LE CHEF DU SERVEUR?")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Nop!")
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Robot:Nop!")

        try { await user.send(`${message.user.tag} vous a warn sur le serveur ${message.guild.name} pour la raison \`${reason}\``) } catch (err) {}

        await message.reply(`Vous avez warn ${user.tag} pour la raison \`${reason}\` avec succès!`)

        let ID = await bot.function.createId("WARN")

        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/`/g, "\\`")}', '${Date.now()}')`)
    }
}