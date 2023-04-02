const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    
    name: 'clear',
    description: 'Supprime des messages du serveur',
    category: "Modération",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de messages à supprimer",
            required: true,
            autocomplete: false
        },
        {
            type: "channel",
            name: "salon",
            description: "Le salon où effacer les messages",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Ce salon n'existe pas!")

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Nop! Le nombre de message à supprimer doit etre entre 0 et 100.")

        await message.deferReply()

        try {

            let messages = await channel.bulkDelete(parseInt(number))

            await message.channel.send({content: `Adieu les \`${messages.size}\` message(s) du salon ${channel}!`, ephemeral: true})

        } catch (err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if(messages.length <= 0) return message.followUp("Aucun message à supprimer car il datent tous de plus de 14 jours!")
            await channel.bulkDelete(messages)

            await message.followUp({content: `Seulement \`${messages.length}\` message(s) supprimé car les autres dataient de plus 14 jours!`, ephemeral: true})

        }
    
    }
}