const Discord = require('discord.js')

module.exports = {

    name: "setprofile",
    description: "Pourquoi une description puisque 1 seule perssonne peut l'utiliser?.",
    category:"SPÉCIAL",
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre!",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "note",
            description: "Note du membre!",
            required: false,
            autocomplete: false
        },
        {
            type: "string",
            name: "trouve",
            description: "Comment tu le trouve?",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        if(message.user.id !== "754743152404856872") return message.reply({content: "Tu n'est pas la perssone qui peut utiliser la commande!", ephemeral: true})

        let user;
        if(args.getUser('membre')) {

            user = args.getUser('membre')
            if(!user || !message.guild.members.cache.get(user.id)) return message.reply({content: "Ce membre n'existe pas!", ephemeral: true})

        } else user = message.user;

        db.query(`SELECT * FROM stats WHERE user = '${user.id}'`, async (err, req) => {

            if(req.length < 1) {
    
                db.query(`INSERT INTO stats (user, notedesans, sansletrouve) VALUES ('${user.id}', 'Aucune', '...')`)
            }

            let note = args.getString("note")
            let trouve = args.getString("trouve")

            if(!note) note = "Aucune"
            if(!trouve) trouve = "..."

            db.query(`UPDATE stats SET notedesans = '${note}' WHERE user = '${user.id}'`)
            db.query(`UPDATE stats SET sansletrouve = '${trouve}' WHERE user = '${user.id}'`)

            message.reply({content: `Le membre ${user.tag} a bien comme note: \`${note}\` et tu le trouve \`${trouve}\`!`, ephemeral:true})

        })
    }
}