const fs = require("fs")

module.exports = async bot => {

fs.readdirSync("./Music").filter(f => f.endsWith(".js")).forEach(async file => {

    const music = require(`../Music/${file}`)
    bot.player.events.on(file.split(".js").join(""), music.bind(null, bot))

    console.log(`Music ${file} chargée avec succès !`)
    })
} 