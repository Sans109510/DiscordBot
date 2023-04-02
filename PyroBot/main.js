const Discord = require("discord.js")
const Player = require("discord-player")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const loadPlayerEvents = require("./Loaders/loadPlayerEvents")
const config = require("./config")
const Fun = require("./Fun/index")
    
bot.player = new Player.Player(bot, {
    leaveOnEnd: true,
    leaveOnEmpty: true,
    volume: 10,
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})
bot.commands = new Discord.Collection()
bot.color = "#FF0000"
bot.function = {
    createId: require("./Functions/createId"),
    generateCaptcha: require("./Functions/generateCaptcha"),
}

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)
loadPlayerEvents(bot)