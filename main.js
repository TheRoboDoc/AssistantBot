const { Client, Intents, Message, MessageEmbed, DiscordAPIError, Collection } = require('discord.js');
const { FILE } = require('dns');

const AssistantUnit = new Client({intents : [Intents.FLAGS.GUILD_MESSAGES , Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS]});

const prefix = '+';

const fs = require('fs');
const pingadmin = require('./commands/pingadmin');

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

    switch (command) {
        case 'ping':
            AssistantUnit.commands.get('ping').execute(message, args);
            break;

        case 'pingadmin':
            AssistantUnit.commands.get('pingadmin').execute(message, args);
            break;

        case 'permissioncheck':
            AssistantUnit.commands.get('permissioncheck').execute(message, args);
            break;

        case 'play':
            AssistantUnit.commands.get('play').execute(message, args);
            break;
        
        case 'leave':
            AssistantUnit.commands.get('leave').execute(message, args);
            break;

        case 'clear':
            AssistantUnit.commands.get('clear').execute(message, args);
            break;

        default:
            message.channel.send('Invalid command');
            break;
    }
});

AssistantUnit.login(''); //Redacted
