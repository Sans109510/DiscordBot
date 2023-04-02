const Discord = require("discord.js")

module.exports = {
    
    name: 'warnlist',
    description: "Affiche la liste des warns d'un membre",
    category: "Modération",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à afficher la liste des warns",
            required: true,
            autocomplete: false
        }
    ],


    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Veuillez mentionner un membre")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("veuillez mentionner un membre")

        db.query(`SELECT * FROM warns WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

            if(req.length < 1) return message.reply("Aucun warn n'a été trouvé")
            await req.sort((a, b) => parseInt(a.date) - parseInt(b.date) )

            let Embed = new Discord.EmbedBuilder()
            .setColor("#0099ff")
            .setTitle(`Warns de ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({text: "＼（〇_ｏ）／"})

            for(let i = 0; i < req.length; i++) {

                Embed.addFields([{name: `Warn n°${i+1}`, value: `> **Auteur** : ${(await bot.users.fetch(req[i].author)).tag}\n **ID** : \`${req[i].warn}\`\n **Raison** : \`${req[i].reason}\`\n **Date** : <t:${Math.floor(parseInt(req[i].date) / 1000)}>`}])
            }

            await message.reply({embeds: [Embed]})
        })
    }
}