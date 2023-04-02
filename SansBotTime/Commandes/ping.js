const Discord = require("discord.js")

module.exports = {
    
    name: 'ping',
    description: 'Pong!',
    category: "Informations",
    permission: "Aucune",
    dm: true,


    async run(bot, message, args) {
        await message.reply(`Pong! \`${bot.ws.ping}\` ms`)
    }
}