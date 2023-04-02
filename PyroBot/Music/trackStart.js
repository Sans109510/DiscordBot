module.exports = async(bot, queue, track) => {

    await queue.metadata.channel.send(`La musique ${track.title} est lancée !`)
}