const Discord = require('discord.js')

module.exports = {

    name: "say",
    description: "Pourquoi une description puisque 1 seule perssonne peut l'utiliser?",
    category:"SPÉCIAL",
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: "string",
            name: "message",
            description: "Message à envoiyer!",
            required:true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        if(message.user.id !== "754743152404856872") return message.reply({content: "Tu n'est pas la perssone qui peut utiliser la commande!", ephemeral: true})
        let say = args.getString("message")
        await message.channel.send(say)
        await message.reply({content:"Le message a étais envoiyé", ephemeral:true})

       
    }
}