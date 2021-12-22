module.exports = {
    name: 'ping',
    description: "A ping command to test if the bot is online",
    execute(message, args){

        message.channel.send('Pong');

    }
}