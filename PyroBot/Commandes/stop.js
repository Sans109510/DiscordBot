const Discord = require("discord.js")

module.exports = {
    
    name: 'stop',
    description: 'Stop la musique',
    category: "Musique",
    permission: "Aucune",
    dm: false,
    options: [],

    async run(bot, message, args) {

        const queue = await bot.player.nodes.create(message.guild, {metadata: message})
        if(!queue.connection || !queue.node.isPlaying()) return message.reply("Le bot ne joue pas de music")

        queue.delete()
        message.reply("La music a bien étais arreter.")
    }
}