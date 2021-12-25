const { Client, Intents, Message, MessageEmbed, DiscordAPIError, Collection } = require('discord.js');

const AssistantUnit = new Client({intents : [Intents.FLAGS.GUILD_MESSAGES , Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS]});

const prefix = '+';

const fs = require('fs');

AssistantUnit.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    AssistantUnit.commands.set(command.name, command);
}

AssistantUnit.once('ready', () => {
    console.log('Assistant Unit is online!');
    
});

AssistantUnit.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    message.channel.send('Command recieved...');

    try{
        AssistantUnit.commands.get(command).execute(message, args);
    }
    catch(error){
        console.error(error);
        message.channel.send('Command not found');
    }

});

AssistantUnit.login(''); //Redacted
