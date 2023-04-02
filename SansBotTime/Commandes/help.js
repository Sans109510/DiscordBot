const Discord = require('discord.js')

module.exports = {

    name: "help",
    description: "Vous trouverez la liste des commandes",
    category:"Informations",
    permission: "Aucune",
    dm: true,
    options: [
        {
            type: "string",
            name: "commande",
            description: "Commande à afficher",
            required:false,
            autocomplete: true
        }
    ],

    async run(bot, message, args) {

        let command;
        if(args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"));
            if(!command) return message.reply("Ce commande n'existe pas");
        }

        if(!command) {

            let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle("Liste des commandes")
            .setDescription("Vous trouverez la liste des commandes")
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({text:"Ce bot appartient à Sans109510#3427", iconURL:"https://yt3.ggpht.com/844LPndajjA0aRuZ9c8yXof3l3s8-laNRLxIgdMg-AQojI2gdYDeyFssN-pgOMUIZSILuXeK=s100-c-k-c0x00ffffff-no-rj-mo"})

            await categories.sort().forEach(async cat => {

                let commands = bot.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [Embed]})

        } else {

            let Embed = new Discord.EmbedBuilder()
            .setColor("#0099ff")
            .setTitle(`Commande ${command.name}`)
            .setDescription(`Nom: \`${command.name}\`\nDescription: \`${command.description}\`\nPermission:\`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCommande en DM : \`${command.dm ? "Oui" : "Nop"}\`\nCatégorie: \`${command.category}\``)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({text:"Ce bot appartient à Sans109510#3427", iconURL:"https://yt3.ggpht.com/844LPndajjA0aRuZ9c8yXof3l3s8-laNRLxIgdMg-AQojI2gdYDeyFssN-pgOMUIZSILuXeK=s100-c-k-c0x00ffffff-no-rj-mo"})

            await message.reply({embeds: [Embed]})
        }
    }
}