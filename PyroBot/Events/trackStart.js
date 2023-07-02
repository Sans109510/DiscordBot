module.exports = async () => {

    player.events.on('playerStart', (queue, track) => {
        
        const channel = queue.metadata.channel;
        channel.send(`La musique ${track.title} est lancé!!!`);
    })

}