const Discord = require("discord.js")

module.exports = {

    name: "setcaptcha",
    description: "Paramètre de captcha",
    category: "Administration",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    options: [
        {
            type: "string",
            name: "état",
            description: "Etat du captcha(oui ou non)",
            required: true,
            autocomplete: true
        },
        {
            type: "channel",
            name: "salon",
            description: "Salon ou est le captcha (si il est activé)",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, db) {

        let etat = args.getString("état")
        if(etat !== "oui" && etat !== "non") return message.reply("indique si oui ou non.")

        if(etat === "non") {

            db.query(`UPDATE server SET captcha = 'false' WHERE guild ='${message.guildId}'`)
            await message.reply("Le captcha a étais désactivé!")

        } else {

            let channel = args.getChannel("salon")
            if(!channel) return message.reply("Pas de salon selectioner!")
            channel = message.guild.channels.cache.get(channel.id)
            if(!channel) return message.reply("salon non trouvé!")

            db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild ='${message.guildId}'`)
            await message.reply(`Le captcha a étais activé dans le salon ${channel}!`)
        }
    }
}