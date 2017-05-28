const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on ('ready',() => {
  console.log('I\'m am ready');
});

client.on('disconnect', () =>{
  console.log(`You have been disconnected at ${new Date()}`);
});

client.on('reconnecting', () => {
  console.log(`Reconnecting at ${new Date()}`);
});

// client.on('',''=>{});

client.on('guildDelete', guild => {
  console.log(`I have left ${guild.name} at ${new Date()}`);
});

client.on('guildCreate', guild => {
  guild.defaultChannel.sendMessage(`I have joined ${guild.name}`);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Please welcome ${member.user.username} to the server!`);
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Please say goodbye to ${member.user.username} we will miss you!`);
});

client.on('guildBanAdd',(guild, user) => {
  guild.defaultChannel.sendMessage(`${user.username} was just banned!`);
});

client.on('guildBanRemove',(guild, user) => {
  guild.defaultChannel.sendMessage(`${user.username} was just unbanned!`);
});

//Client Events

client.on('channelPinsUpdate', (channel, time) => {
  channel.guild.defaultChannel.sendMessage(`The pins for ${channel.name} have been updated at ${time}`);
});

client.on('messageDelete', msg => {
  msg.guild.defaultChannel.sendMessage(`A message with the contents ${msg.cleanContent} was deleted from ${msg.channel}`);
});

client.on('messageDeleteBulk', messages => {
  console.log(`${messages.size} was deleted`);
});

var prefix = "//"

client.on ('message', message =>{
  var guild = message.guild;
  let args = message.content.split(' ').slice(1);
	var argresult = args.join(' ');
  var date = new Date();

  if(!message.content.startsWith(prefix))return;
  if(message.author.bot)return;

  if (message.content.startsWith(prefix + 'rolecreate')) {
    guild.createRole({name:argresult, color:'#00FFFF', mentionable:true}).catch(error => console.log(error));
  } else

  if (message.content.startsWith(prefix + 'giverole')) {
    guild.member(message.mentions.users.first()).addRole(argresult).catch(error => console.log(error));
  } else

  if (message.content.startsWith(prefix + 'takerole')) {
    guild.member(message.mentions.users.first()).removeRole(argresult).catch(error => console.log(error));
  } else

  if (message.content.startsWith(prefix + "purge")) {
    let messagecount = parseInt(argresult);
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
  } else

  if(message.content.startsWith(prefix + 'ping')){
    message.channel.send(`ping \`${Date.now() - message.createdTimestamp} ms\``)
  } else

  if(message.content.startsWith(prefix + 'send')){
    client.channel.get('318249791886721024').send("Hello test channel")
  }else

  if(message.content.startsWith(prefix + 'setgame')){
    client.user.setGame(argresult);
    message.channel.send(`i am now playing ${argresult}`);
    console.log(`Now Im Playing ${argresult} At (${date})`);
  }else

  if(message.content.startsWith(prefix + 'setstatus')){
    client.user.setStatus(argresult);
    if (argresult === 'dnd'){
      message.channel.send('I am now on Do Not Disturb.')
      message.channel.send("DON'T BOTHER ME")
      console.log(`I Was Set ${argresult} At (${date})`);
    }
    if (argresult === "online"){
      message.channel.send("I'm Online How May I Help")
      console.log(`I Was Set ${argresult} At (${date})`);
    }
    if (argresult === "idle"){
      message.channel.send("Be Back In 5 Mins")
      console.log(`I Was Set ${argresult} At (${date})`);
    }
  }

  if(message.content.startsWith(prefix + 'food')){
    message.channel.send('bar!')
  }
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(settings.token);
