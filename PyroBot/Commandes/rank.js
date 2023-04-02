const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")

module.exports = {

    name: "rank",
    description: "Donne le FIRE d'un membre",
    category: "Expérience",
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "FIRE d'un membre",
            required: false,
            autocomplete: false            
        },
    ],

    async run(bot, message, args, db) {

        let user;
        if(args.getUser('membre')) {
            user = args.getUser('membre')
            if(!user || !message.guild.members.cache.get(user.id)) return message.reply("Ce membre n'existe pas!")
        } else user = message.user;

        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {
            
            db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err, all) => {
                
                if(req.length < 1) return message.reply("Vous n'avez aucun FIRE.")

                await message.deferReply()

                const calculXp = (xp,level) => {
                    let xptotal = 0;
                    for(let i = 0; i < level + 1; i++) xptotal += i * 1000
                    xptotal += xp;
                    return xptotal
                }
            
                let leaderboard = await all.sort((a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))
                let xp = parseInt(req[0].xp)
                let level = parseInt(req[0].level)
                let rank = leaderboard.findIndex(r => r.user === user.id) + 1
                let need = (level + 1) * 1000;
                let Card = await new Canvas.Card()
                .setBackground("https://as1.ftcdn.net/v2/jpg/00/59/68/10/1000_F_59681074_3aOQLtTFCaxMKt1n8g5GJMKZvltkd4OX.jpg")
                .setBot(bot)
                .setColorFont("##FF0000")
                .setRank(rank)
                .setUser(user)
                .setGuild(message.guild)  
                .setXp(xp)
                .setLevel(level)
                .setXpNeed(need)
                .toCard()
                 await message.followUp({files: [new Discord.AttachmentBuilder(Card.toBuffer(), {name: "rank.png"})]})
            })
        })
    }
}