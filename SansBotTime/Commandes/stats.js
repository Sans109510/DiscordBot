const Discord = require('discord.js');
const { access } = require('fs');

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

    async run(bot, message, args, db) {

        try{

            let user;
            if(args.getUser('membre')) {
    
                user = args.getUser('membre')
                if(!user || !message.guild.members.cache.get(user.id)) return message.reply("Ce membre n'existe pas!")
    
            } else user = message.user;
    
            let member;
            if(args.getUser('membre')) {
                
                member = message.guild.members.cache.get(args.getUser('membre').id)
                if(!member || !message.guild.members.cache.get(member.id)) return message.reply("Ce membre n'existe pas!")
    
            } else member = message.member;
            
            let status;
            let activities;
            if(member.presence !== null) {
    
                status = member.presence.status

                activities = [];
                for(let i = 0; i < member.presence.activities.length; i++) activities.push(member.presence.activities[i]);
                activities = activities.join(", ");

            } else {
                status = "offline";
                activities = "";
            }
    
            let badges = [];
            for(let i = 0; i < user.flags.toArray().length; i++) badges.push(user.flags.toArray([i]));
            badges = badges.join(", ")
    
            db.query(`SELECT * FROM stats WHERE user = '${user.id}'`, async (err, req) => {
    
                if(req.length < 1) {
        
                    db.query(`INSERT INTO stats (user, notedesans, sansletrouve) VALUES ('${user.id}', 'Aucune', '...')`)
                    message.reply({content: `Veuiller Ressayer!`, ephemeral:true})
                    
                } else{
                    
                    let notedesans = req[0].notedesans
                    let sansletrouve = req[0].sansletrouve
                 
                    let Embed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
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
                            name: "Badges",
                            value: `\`${badges}\``,
                            inline: true
                        },
                        {
                            name: "Status",
                            value: `\`${status}\``,
                            inline: true
                        },
                        {
                            name: "Activités",
                            value: `\`${activities}\``,
                            inline: true
                        },
                        {
                            name: "Sur Discord Depuis",
                            value: `\`${user.createdAt}\``
                        },
                        {
                            name: "Sur Le Serveur Depuis",
                            value: `\`${member.joinedAt}\``
                        },
                        {
                            name: "Note de Sans109510#3427",
                            value: `\`${notedesans}\``
                        },
                        {
                            name: "Sans109510#3427 Le Trouve",
                            value: `\`${sansletrouve}\``
                        },
                        )   
                    .setTimestamp()
                    .setFooter({text:"Ce bot appartient à Sans109510#3427 Mais a étais crée pour le serveur Team Pyro Plasma", iconURL:"https://yt3.ggpht.com/844LPndajjA0aRuZ9c8yXof3l3s8-laNRLxIgdMg-AQojI2gdYDeyFssN-pgOMUIZSILuXeK=s100-c-k-c0x00ffffff-no-rj-mo"})
                    
                    await message.reply({embeds: [Embed]})
                    }
            })
        
        } catch (err) {

            message.reply({content: `Une erreur inconnue s'est produite.\n\nErreur: ${err}`, ephemeral:true})

        }

    }
       
}