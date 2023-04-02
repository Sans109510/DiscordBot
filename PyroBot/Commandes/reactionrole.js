const Discord = require("discord.js")

module.exports = {
    
    name: 'reactionrole',
    description: 'Envoie le reaction role',
    category: "Administration",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    options: [],

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM server WHERE guild = '${message.guildId}'`, async (err, req) => {

            let roles = req[0].reactionrole.split(" ")
            if(roles.length <= 0) return message.reply("Pas de role!")

            let Embed = new Discord.EmbedBuilder()
            .setColor("#FF0000")
            .setTitle("Reaction Roles")
            .setDescription("Vous trouverez la liste des roles")
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({text:"Ce bot appartient à Sans109510#3427 Mais a étais crée pour le serveur Team Pyro Plasma", iconURL:"https://yt3.ggpht.com/844LPndajjA0aRuZ9c8yXof3l3s8-laNRLxIgdMg-AQojI2gdYDeyFssN-pgOMUIZSILuXeK=s100-c-k-c0x00ffffff-no-rj-mo"})

            let options = [];
            for(let i = 0; i < roles.length; i++) {
                let role = message.guild.roles.cache.get(roles[i])
                if(!role) return;
                await options.push({label: `@${role.name}`, value: role.id})
            }

            const menu = new Discord.ActionRowBuilder().addComponents(new Discord.SelectMenuBuilder()
            .setCustomId("reactionrole")
            .setMinValues(0)
            .setMaxValues(roles.length)
            .setPlaceholder("Selectionnez vos roles!")
            .addOptions(options))

            await message.reply({embeds: [Embed], components: [menu]})
        })
    }
}