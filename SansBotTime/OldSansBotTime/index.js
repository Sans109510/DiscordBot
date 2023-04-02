const { Client, GatewayIntentBits, EmbedBuilder, Embed } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = ".!";

client.on("ready", () => {
    console.log(`OldIsAlwayBetter "Bot opérationnel thank Loudrasiel"`)
})


client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === prefix + "ping") {
        message.reply("pong !");
    }
    if (message.content === prefix + "badtime") {
        message.reply("Do you wanna have a badtime? (veut tu avoir un mauvais moment?)");
    }

    if (message.content === prefix + "stronger than you") {
        message.reply("https://img.youtube.com/vi/4TzVOLOROkM/hqdefault.jpg?rev=2.8.2.0");
    }

    if (message.content === prefix + "i am impostor") {
        message.reply("https://tenor.com/view/among-us-emergency-death-impostor-gif-21161291");
    }

    if (message.content === prefix + "sus") {
        message.reply("https://tenor.com/view/sus-gif-20482266");
    }

    if (message.content === prefix + "HANKKK") {
        message.reply("https://tenor.com/view/fnf-tricky-hank-gif-21909083");
    }

    if (message.content === prefix + "cookie") {
        message.reply("https://tenor.com/view/tricky-cookie-cooki-tiky-cuki-gif-21819648");
    }

    if (message.content === prefix + "i win xD") {
        message.reply("https://tenor.com/view/pc-man-crush-rage-gif-20192828");
    }

    if (message.content === prefix + "i lose ;'(") {
        message.reply("https://tenor.com/view/conasse-french-dans-ta-gueule-gif-12369176");
    }

    if (message.content === prefix + "...") {
        message.reply("...");
    }

    if (message.content === "SansBotTime") {
        message.reply("Hein quoi on ma appeler faite .!help pour avoir mes commandes");
    }

    if (message.content === prefix + "je suis mechant") {
        message.reply("Tu croix que ses malin de faire sa BAH NON SES PAS MALIN")

    }

    //.!help
    else if (message.content === prefix + "help") {
        const embed = new EmbedBuilder()
         .setColor("#0099ff")
         .setTitle("Liste des commandes")
         .setDescription("Vous trouverez la liste des commandes")
         .addFields(
            {name: "**__.!help__**" , value:"Affiche la liste des commande"},
            {name: "**__.!ping__**" , value:"Vous renvoi pong"},
            {name: "**__.!je suis mechant__**" , value:"c po bi1"},
            {name: "**__.!...__**" , value:"..."},
            {name: "**__.!stronger than you__**" , value:"montre la miniature de stronger than you version undertale"},
            {name: "**__.!badtime__**" , value:"Vous demande si vous vouler un badtime mais vous ne réponder pas apres"},
            {name: "**__.!i am impostor__**" , value:"Apuis sur le bouton d'urgence mais ça ne marchera jamais"},
            {name: "**__.!sus__**" , value:"when the impostor is sus"},
            {name: "**__.!HANKKK__**" , value:"Rip Hank..."},
            {name: "**__.!cookie__**" , value:"tricky et cookie..."},
            {name: "**__.!i win xD__**" , value:"OldSansBotTime est un mauvais joueur..."},
            {name: "**__.!i lose ;'(__**" , value:"Ses pas tres gentil..."})
         .setTimestamp()
         .setFooter({text:"Ce bot appartient à Sans109510#3427", iconURL:"https://yt3.ggpht.com/844LPndajjA0aRuZ9c8yXof3l3s8-laNRLxIgdMg-AQojI2gdYDeyFssN-pgOMUIZSILuXeK=s100-c-k-c0x00ffffff-no-rj-mo"})
           
            

        message.channel.send({ embeds: [embed] });
    }
});

client.login("")