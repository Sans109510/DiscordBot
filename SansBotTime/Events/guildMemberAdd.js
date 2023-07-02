const Discord = require('discord.js')

module.exports = async(bot, member) => {

    let db = bot.db;

    db.query(`SELECT * FROM stats WHERE user = '${member.id}'`, async (err, req) => {

        if(req.length < 1) {

            db.query(`INSERT INTO stats (user, notedesans, sansletrouve) VALUES ('${member.id}', 'Aucune', '...')`)
        }
   })

   db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {

        if(req.length < 1) return;

        if(req[0].antiraid === "true") {

            try {await member.user.send("Tu ne peut pas rejoindre le serveut car LE ANTIRAID EST ACTIVER HAAAAAAAAAA!!!!!!")} catch(err) {}
            await member.kick("antiraid activée")
        }

        if(req[0].captcha === "false") return;

        let channel = member.guild.channels.cache.get(req[0].captcha)
        if(!channel) return;

        let role = member.guild.roles.cache.find(role => role.name === 'captcha')
        await member.roles.add(role)

        let captcha = await bot.function.generateCaptcha()

        let msg = await channel.send({content: `${member}, tic tac... tic tac... vous avez 2 minutes pour compléter le captcha!`, files: [new Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), {name: "captcha.png"})]})

        try {

            let filter = m => m.author.id === member.user.id;
            let response = (await channel.awaitMessages({filter, max: 1, time: 120000, errors: ["time"]})).first()

            if(response.content === captcha.text) {

                await msg.delete()
                await response.delete()
                try {await member.user.send("GG tu a réussie 1/100...")} catch (err) {}
                await member.roles.remove(role)

            } else {

                await msg.delete()
                await response.delete()
                try {await member.user.send("Tu a échouer le captcha!")} catch (err) {}
                await member.kick("Le captcha a étais raté!!")
            }

        } catch (err) {

            await msg.delete()
            try {await member.user.send("Tu a échouer le captcha!")} catch (err) {}
            await member.kick("Le captcha n'a pas étais fait.")
        }
        
   })
}