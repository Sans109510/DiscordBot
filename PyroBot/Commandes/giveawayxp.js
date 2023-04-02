const Discord = require("discord.js")

module.exports = {
    
    name: 'giveawayxp',
    description: "Donne de l'expérience a un joueur au hasard",
    category: "Expérience",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre d'expérience à giveaway.",
            required: true,
            autocomplete: false
        },
        {
            type: "user",
            name: "membre",
            description: "Membre qui doit gagner(Il parait que seul une legende peut utiliser cette option).",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 9999) return message.reply("Non! Le nombre d'exp à giveaway doit etre entre 0 et 9999.")

        let role = message.guild.roles.cache.find((role) => role.name === 'giveawayxp')
        let user = args.getUser("membre")

        if (user !== null && message.user.id !== "754743152404856872") message.reply("tu n'a pas étais choisi pour utiliser l'option dommage...")
        if(role.members.size <= 0) return message.reply("personne n'a participer au giveaway donc perssone a gagner...")
        if(!user) user = role.members.random().user;

        let member = message.guild.members.cache.get(user.id)
        if (!member.roles.cache.has(role.id)) { 

            message.reply({content:"Le membre ne participe pas au giveaway...au moins perssone a vu que ta tricher", ephemeral:true})
        } else {

            await message.reply({content:"Tu a fait gagner quelqu'un yeah!", ephemeral:true})
            await message.channel.send(`${user} vient de gagner \`${number}\` xp wow quelle chance! Tu avait 1 chance sur \`${role.members.size}\`!`);

            db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async(err, req) => {

                if(req.length < 1) {
                    
                    db.query(`INSERT INTO xp (guild, user, xp,level) VALUES ('${message.guildId}', '${user.id}', '0', '0')`)
                    db.query(`UPDATE xp SET xp = '${number}' WHERE guild = '${message.guildId}' AND user = '${user.id}'`)
                } else {
                    let xp = parseInt(req[0].xp)
    
                    db.query(`UPDATE xp SET xp = '${xp + number}' WHERE guild = '${message.guildId}' AND user = '${user.id}'`)
                }
            })
        }
    }
}