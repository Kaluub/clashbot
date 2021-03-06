const Keyv = require('keyv');
const userdb = new Keyv('sqlite://data/users.sqlite', {namespace:'users'});

module.exports = {
    name:'status',
    aliases:['st'],
    admin:false,
    desc:'This command is used to set your custom status displayed on your profile card.',
    usage:'!status [reset/text (60 character limit)]',
    async execute(message,args){
        if(!args[0]) return message.channel.send('Usage: ' + this.usage);
        let userdata = await userdb.get(`${message.guild.id}/${message.author.id}`);
        let status;
        if(args[0] == 'reset' && !args.includes('-f')) status = '';
        else status = args.join(' ');
        if(status.length > 60) return message.channel.send('Usage: ' + this.usage);
        userdata.status = status;
        await userdb.set(`${message.guild.id}/${message.author.id}`, userdata);
        return message.channel.send({
            content: status.length < 1 ? 'Your status was reset.' : 'Your status (!profile) was set to: ' + status, 
            disableMentions: 'all'
        });
    }
};