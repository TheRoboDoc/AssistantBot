const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: "Play command for music",
    async execute(message, args){

        const voiceChannel = message.member.voice.channel;

        //if (!voiceChannel) return message.channel.send('You need to be in a voice channel to use this command');
        if (!message.member.permissions.has('CONNECT')) return message.channel.send('You do not have permissions to connect to the voice channel');
        if (!message.member.permissions.has('SPEAK')) return message.channel.send('You do not have permissions to speak in the voice channel');
        if (!args.length) return message.channel.send('Please input what to play');

        /*const connection = await voiceChannel.join().catch(console.error);

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video){
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish',() =>{
                voiceChannel.leave();
            });

            await message.reply(`:notes: As ordered, playing: *${video.title}* :notes:`);
        }
        else{
            message.channel.send('No results found');
        }*/

        const{
            joinVoiceChannel,
            createAudioPlayer,
            createAudioResource
        } =require ('@discordjs/voice');

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video){
            const stream = ytdl(video.url,{filter: "audioonly"});

            const player = createAudioPlayer();
            const resource = createAudioResource(stream, {seek: 0, volume: 1});

            play();

            async function play(){
                await player.play(resource);
                connection.subscribe(player);
            }
        }
    }
}