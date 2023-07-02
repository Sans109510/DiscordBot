const Discord = require("discord.js")

module.exports = {
    
    name: 'play',
    description: 'Joue la musique',
    category: "Musique",
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: "string",
            name: "musique",
            description: "Le nom de la musique",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        try {

            const musique = args.getString("musique");
            if(!message.member.voice.channel) return message.reply("Vous n'êtes pas dans un salon vocal.")
    
            await message.deferReply()
    
            const queue = bot.player.nodes.create(message.guild, {metadata: {message: message}});
    
            const track = await bot.player.search(musique, {requestedBy: message.user}).then(track => track.tracks[0]);
            if (!track) return message.reply("Il n'y a pas de musique avec ce nom!");
    
            if (!queue.connection) await queue.connect(message.member.voice.channel);
            await queue.node.play(track);
            await message.followUp(` La musique \`${track.title}\` a été ajoutée à la file.`)
    
            }  catch (err) {
            await message.followUp({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
        }
    }
}
