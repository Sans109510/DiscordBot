const Discord = require("discord.js")

module.exports = {

    name: "setantiraid",
    description: "Paramètre de L'anti raid",
    category: "Administration",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    options: [
        {
            type: "string",
            name: "état",
            description: "Etat de l'antiraid(oui ou non)",
            required: true,
            autocomplete: true
        }
    ],

    async run(bot, message, args, db) {

        let etat = args.getString("état")
        if(etat !== "oui" && etat !== "non") return message.reply("indique si oui ou non.")

        if(etat === "non") {

            db.query(`UPDATE server SET antiraid = 'false' WHERE guild ='${message.guildId}'`)
            db.query(`UPDATE server SET captcha = 'false' WHERE guild ='${message.guildId}'`)
            await message.reply("L'antiraid a étais désactivé! Je vais aussi désactiver le captcha pour régler des bugs réactive le des que le serveur sera réparer...")

        } else {
           
            db.query(`UPDATE server SET antiraid = 'true' WHERE guild ='${message.guildId}'`)
            await message.reply(`L'antiraid a étais activé !`)
        }
    }
}