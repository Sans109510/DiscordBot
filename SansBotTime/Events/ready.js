const Discord = require('discord.js')
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require('../Loaders/loadSlashCommands')

module.exports = async bot => {

    bot.db = await loadDatabase()
    bot.db.connect(function (err) {

        if(err) console.log(err)
        console.log("Base de données connecté")
    })
    bot.user.setActivity("Undertale", {type: Discord.ActivityType["Playing"]})

    await loadSlashCommands(bot)

    console.log(`${bot.user.tag} est connecté!`)
}