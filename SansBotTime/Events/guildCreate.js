const Discord = require('discord.js')

module.exports = async(bot, guild) => {

    let db = bot.db;

    guild.roles.create({
        name: "captcha",
        permissions: "0",
        position: "1",
        mentionable: false
    },
    {
        name: "giveawayxp",
        permissions: "0",
        position:"2",
        mentionable: false
    },
    {
        name: "giveaway",
        permissions: "0",
        position:"3",
        mentionable: false
    })

   db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {

        if(req.length < 1) {

            db.query(`INSERT INTO server (guild, captcha, antiraid) VALUES ('${guild.id}', 'false', 'false')`)
        }
   })
}