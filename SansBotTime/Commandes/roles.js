const Discord = require("discord.js")

module.exports = {
    
    name: 'roles',
    description: 'Ajoute ou retire un rôle au reaction roles.',
    category: "Administration",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    options: [
        {
            type: "string",
            name: "action",
            description: "add/remove",
            required: true,
            autocomplete: true
        },
        {
            type: "role",
            name: "role",
            description: "Le role a ajouter/retirer",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let action = args.getString("action")
        if(action !== "add" && action !== "remove") return message.reply("Indique si tu ajoute/retire")

        let role = args.getRole("role")
        if(!message.guild.roles.cache.get(role.id)) return message.reply("le role n'existe pas!")
        if(role.managed) return message.reply("Indique un role non géré...")

        if(action === "add") {

            db.query(`SELECT * FROM server WHERE guild = '${message.guildId}'`, async (err, req) => {
                
                let roles = req[0].reactionrole.split(" ")
                if(roles.length >= 25) return message.reply("Vous ne pouvait pas ajouter de roles")

                if(roles.includes(role.id)) return message.reply("Ce role des déja dans le react role")

                await roles.push(role.id)

                await db.query(`UPDATE server SET reactionrole = '${roles.filter(e => e !== "").join(" ")}' WHERE guild= '${message.guildId}'`)
                await message.reply(`Le role \`${role.name}\` a été ajouter au reaction role`)
            })
        }

        if(action === "remove") {

            db.query(`SELECT * FROM server WHERE guild = '${message.guildId}'`, async (err, req) => {
                
                let roles = req[0].reactionrole.split(" ")
                if(roles.length <= 0) return message.reply("Il ya pas de role a retirer!")

                if(!roles.includes(role.id)) return message.reply("Ce role n'est pas dans le react role!")

                let number = roles.indexOf(role.id)
                roles.splice(number, 1)

                await db.query(`UPDATE server SET reactionrole = '${roles.filter(e => e !== "").join(" ")}' WHERE guild= '${message.guildId}'`)
                await message.reply(`Le role \`${role.name}\` a été retirer du reaction role.`)
              
            })
            
        }
       
    }
}