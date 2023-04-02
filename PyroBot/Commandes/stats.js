const Discord = require('discord.js')

module.exports = {

    name: "stats",
    description: "Montre vos stats discord ou le stats d'un membre.",
    category:"Informations",
    permission: "Aucune",
    dm: true,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Voir les stats d'un membre.",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user;
        if(args.getUser('membre')) {

            user = args.getUser('membre')
            if(!user || !message.guild.members.cache.get(user.id)) return message.reply("Ce membre n'existe pas!")

        } else user = message.user;
       
        let Embed = new Discord.EmbedBuilder()
        .setColor("#FF0000")
        .setTitle(`${user.username}'s stats`)
        .setDescription(`Voici les Stats de/d' ${user.username}`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .addFields(
            {
                name: "Nom",
                value: `\`${user.tag}\``,
                inline: true
            },
            {
                name: "ID",
                value: `\`${user.id}\``,
                inline: true
            },
            {
                name: "Bot",
                value: `\`${user.bot}\``,
                inline: true
            },
            {
                name: "Sur Discord Depuis",
                value: `\`${user.createdAt}\``
            }
        )
        .setTimestamp()
        .setFooter({text:"Ce bot appartient à Sans109510#3427 Mais a étais crée pour le serveur Team Pyro Plasma", iconURL:"https://yt3.ggpht.com/844LPndajjA0aRuZ9c8yXof3l3s8-laNRLxIgdMg-AQojI2gdYDeyFssN-pgOMUIZSILuXeK=s100-c-k-c0x00ffffff-no-rj-mo"})

        await message.reply({embeds: [Embed]})
    }
}