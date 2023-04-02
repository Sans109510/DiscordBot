const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")

module.exports = {

    name: "leaderboard",
    description: "Donne le Classement des FIRE du serveur",
    category: "Expérience",
    permission: "Aucune",
    dm: false,
    options: [],

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err, req) => {
            if(req.length < 1) return message.reply("Tout le monde est muet?")

            await message.deferReply()

            const calculXp = (xp,level) => {
                let xptotal = 0;
                for(let i = 0; i < level + 1; i++) xptotal += i * 1000
                xptotal += xp;
                return xptotal
            }

            let leaderboard = await req.sort((a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))

            const Leaderboard = await new Canvas.Leaderboard()
            .setBot(bot)
            .setGuild(message.guild)
            .setBackground("https://rocketleague.media.zestyio.com/1ebb09c0-6969-47a9-8988-d91427a22e43.jpg")
            .setColorFont("#FF0000")

            for(let i = 0; i < (req.length > 10 ? 10 : req.length); i++) {

                await Leaderboard.addUser(await bot.users.fetch(leaderboard[i].user), parseInt(leaderboard[i].level), parseInt(leaderboard[i].xp), (parseInt(leaderboard[i].level) + 1) * 1000)
            }

            const Image = await Leaderboard.toLeaderboard()

            await message.followUp({files: [new Discord.AttachmentBuilder(Image.toBuffer(), {name: "Leaderboard.png"})]})
        })
    }
}