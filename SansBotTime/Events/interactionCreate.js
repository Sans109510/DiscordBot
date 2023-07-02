const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

        if(interaction.commandName === "help") {

            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }

        if(interaction.commandName === "setcaptcha" || interaction.commandName === "setantiraid") {

            let choices = ["oui", "non"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }

        if(interaction.commandName === "roles") {

            let choices = ["add", "remove"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }

        if(interaction.commandName === "setstatus") {

            let choices = ["Listening", "Watching", "Playing", "Streaming", "Competing"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }
       
    } 

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options, bot.db)
    }
    if(interaction.isButton()) {

        if(interaction.customId === "ticket") {

            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: Discord.ChannelType.GuildText,
            })
            await channel.setParent(interaction.channel.parent.id)

            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                ViewChannel: false
            })
            await channel.permissionOverwrites.create(interaction.user, {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })
            await channel.permissionOverwrites.create("1068621104421281833", {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })
            
            await channel.setTopic(interaction.user.id)
            await interaction.reply({content: `Votre ticket a correctement été créé: ${channel}`, ephemeral: true})

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle("Création d'un ticket.")
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription("Ticket crée.")
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            
            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("close")
            .setLabel("Fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️"))

            await channel.send({embeds: [Embed], components: [btn]})
        }

        if(interaction.customId === "close") {

            let user = bot.users.cache.get(interaction.channel.topic)
            try {await user.send("Votre ticket a étais fermé")} catch(err) {}

            await interaction.channel.delete()

        }
    }

    if(interaction.isSelectMenu()) {

        if(interaction.customId === "reactionrole") {

            bot.db.query(`SELECT * FROM server WHERE guild = '${interaction.guildId}'`, async (err, req) => {

                try {

                    let roles = req[0].reactionrole.split(" ");
                    if(roles.length <= 0) return;
    
                    await interaction.deferReply({ephemeral: true})
    
                    let retiredroles = [];
                    let addroles = [];
                    for(let i = 0; i < roles.length; i++) {
                        if(interaction.member.roles.cache.has(roles[i]) && !interaction.values.includes(roles[i])) {
                            await interaction.member.roles.remove(roles[i])
                            await retiredroles.push(roles[i])
                        }
                    }
                    for(let i = 0; i < interaction.values.length; i++) {
                        await interaction.member.roles.add(interaction.values[i])
                        await addroles.push(interaction.values[i])
                    }
    
                    await interaction.followUp({content: `${addroles.length <= 0 ? "" : `Les rôles ${addroles.map(r => `\`${interaction.guild.roles.cache.get(r).name}\``).join(", ")} vous ont été ajouter.`} ${retiredroles.length <= 0 ? "" : `Les rôles  ${retiredroles.map(r => `\`${interaction.guild.roles.cache.get(r).name}\``).join(", ")} vous ont été retirés.`}`, ephemeral: true})

                } catch(err) { 

                    interaction.followUp({content: "une erreur ses produite veuiller ressayer!", ephemeral:true})
                }
            })
        }
    }
}