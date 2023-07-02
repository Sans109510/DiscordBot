const Discord = require("discord.js")

module.exports = {
    
    name: 'giveaway',
    description: "Mentionne un joueur au hasard",
    category: "Autres",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    options: [
        {
            type: "string",
            name: "reward",
            description: "La recompence du giveaway.",
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args) {
        
        let reward = args.getString("reward")
        let role = message.guild.roles.cache.find((role) => role.name === 'giveaway')
        
        if(role.members.size <= 0) return message.reply("personne n'a participer au giveaway donc perssone a gagner...(ses studipe sa!)")
        winner = role.members.random().user;

        await message.reply({content:"Tu a fait gagner quelqu'un yeah!", ephemeral:true})
        await message.channel.send(`${winner} vient de gagner \`${reward}\` wow quelle chance! Tu avait 1 chance sur \`${role.members.size}\`!`);
        
    }
}