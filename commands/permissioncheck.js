module.exports = {
    name: 'permissioncheck',
    description: "Checks if the user has audit log permission",
    execute(message, args){

        if(message.member.permissions.has("VIEW_AUDIT_LOG")){
            message.channel.send('You have the permission to view the audit log');
        }
        else{
            message.channel.send('You do not have the permission to view the audit log');
        }

    }
}