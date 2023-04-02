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
    
        let song = args.getString("musique")
        if(!message.member.voice.channel) return message.reply("rejoin un vocal!")
        if((await message.guild.members.fetchMe()).voice.channel && (await message.guild.members.fetchMe()).voice.channel.id !== message.member.voice.channel.id) return message.reply("Ou est tu ? je ne suis pas dans le meme vocal?")

        message.deferReply()

        const queue = bot.player.nodes.create(message.guild, {
            metadata: {message: message}})

        const track = await bot.player.search(song, {requestBy: message.user}).then(x => x.tracks[0])
        if(!track) return message.reply("Aucune musique trouvée...")

        if(!queue.connection) await queue.connect(message.member.voice.channel)
        await queue.node.play(track)
        message.followUp(`La musique ${track.title} à été ajouter a la file!`)
    }
}