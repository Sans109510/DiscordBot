const { Client, GatewayIntentBits, EmbedBuilder, Embed } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = "!.";

client.on("ready", () => {
    console.log(`OldIsAlwayBetter "Bot opérationnel thank Loudrasiel"`)
})


client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === prefix + "ping") {
        message.reply("pong !");
    }
    if (message.content === prefix + "free credits") {
        message.reply("https://tenor.com/view/rick-astly-rick-rolled-gif-22755440");
    }
    if (message.content === prefix + "platine") {
        message.reply("https://tenor.com/view/rocket-league-free-style-rl-gif-8178808674824898072");
    }
    if (message.content === prefix + "tournoi perdu") {
        message.reply("https://tenor.com/view/dance-coffin-meme-rip-gif-16909625");
    }
    if (message.content === "quoi" || message.content === "Quoi" || message.content === "Quoi?" || message.content === "quoi?" || message.content === "De quoi" || message.content === "De quoi?" || message.content === "de quoi?" || message.content === "de quoi" || message.content === "QUOI" || message.content === "QUOI?" || message.content === "QUOI!") {
        message.reply("Feur!");
    }
    if (message.content === "feur" || message.content === "Feur" || message.content === "Feur!" || message.content === "feur!" || message.content === "FEUR" || message.content === "FEUR!") {
        message.reply("Ta flop!");
    }
    if (message.content === prefix + "skibidi") {
        message.reply("https://tenor.com/view/skibidi-bop-bop-yes-yes-%D0%BF%D1%83%D0%B7%D0%BE-%D0%B6%D0%B8%D0%B2%D0%BE%D1%82-%D1%81%D0%BC%D0%B5%D1%85-%D1%82%D0%B0%D0%BD%D1%86%D1%8B-gif-27224458");
    }

    //"!.help"
    else if (message.content === prefix + "help") {
        const embed = new EmbedBuilder()
         .setColor("#FF0000")
         .setTitle("Liste des commandes")
         .setDescription("Vous trouverez la liste des commandes")
         .addFields(
            {name: "**__!.help__**" , value:"Affiche la liste des commande"},
            {name: "**__!.ping__**" , value:"Vous renvoi pong"},
            {name: "**__!.free credits__**" , value:"OMG FREE CREDITS"},
            {name: "**__!.platine__**" , value:"Platine Ok"},
            {name: "**__!.tournoi perdu__**" , value:"RIP peut être la prochaine fois?"},
            {name: "**__!.skibidi__**" , value:"Skibidi Bop Yes Yes"})
         .setTimestamp()
         .setFooter({text:"Ce bot appartient à Sans109510#3427 mais a étais crée pour le serveur Team Pyro Plasma", iconURL:"https://yt3.ggpht.com/844LPndajjA0aRuZ9c8yXof3l3s8-laNRLxIgdMg-AQojI2gdYDeyFssN-pgOMUIZSILuXeK=s100-c-k-c0x00ffffff-no-rj-mo"})
           
            

        message.channel.send({ embeds: [embed] });
    }
});

client.login("")