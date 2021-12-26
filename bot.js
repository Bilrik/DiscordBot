const Prefix = "$"

// Run dotenv
require('dotenv').config();

//Import Libraries
const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const client = new Discord.Client();

//Event Listener when a user connected to the server.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        activity:{
                type: 'COMPETING',
                name: 'Use '+Prefix+'help for help'
        }
    });
});


//Initialze bot by connecting to the server
client.login(process.env.DISCORD_TOKEN);

//Event Listener when a user connected to the server.
client.on('message', msg => {
//msg.reply(JSON.stringify(msg.content).substring(1,2))


if ((msg.content).substring(0,1) === Prefix){
  Mess = (msg.content).split(' ');
  Pr = (Mess[0].substring(1)).toLowerCase();

//looks for messages with chosen command
  switch (Pr){
    case 'i':
    case 'italicize':
        msg.reply('*'+((Mess.slice(1)).join(' '))+'*');
        break;

    case 'r':
    case 'roll':
        sum = 0;
        x = (Mess[1].split('d'));
        //test values//
        //msg.reply(x[0]);
        //msg.reply(x[1]);
        while (x[0]-->0){
        sum += Math.floor(Math.random()*(x[1]))+1
        }

        msg.reply(sum);
        break;

case 'b':
    case 'blake':
    case 'gay':
        msg.channel.send("Blake is Gay!");
        break;

    case 'h':
    case 'help':
        msg.channel.send(`
                Prefix: $
                These are my supported commands:
                        **help** or **h** - Displays the help menu
                        **italicize** or **i** - Italicizes given string
                        **roll** or **r** - Returns the sum of specified number of dice with specified number of sides
                        **blake** or **gay** or **b** - Returns a 100% factually true statement used to determine a base line in lie detector tests
                        **Picard** or **facepalm** or **f** - Returns the sure disapointment you have on others
                        **encouragement** or **e** - used to encourage others or yourself
                        **picture** or **p** - grabs random picture of chosen subject
                        **reddit** or **r/** - returns the first image found on specified sub reddit
                `);

        break;

    case 'f':
    case 'facepalm':
    case 'picard':
        msg.channel.send('https://media2.giphy.com/media/TJawtKM6OCKkvwCIqX/giphy.gif');
        break;

    case 'e':
    case 'encouragement':
        x=Math.floor(Math.random()*5)
        link = ["https://media0.giphy.com/media/l1J3QMgxq4SS8EHXa/giphy.gif?cid=ecf05e47l63gcq63vd0yej1or1x2hykzv76nsp8iwot1mgld&rid=giphy.gif", "https://giphy.com/gifs/kenny-good-job-cabin-boy-xUA7bf3sHeSuIKF1mg", "https://media3.giphy.com/media/W63ZJmQ4qdblTM9Wbi/giphy.gif?cid=ecf05e47d584w6md25s8jsxy95t2mvbdjvmdmo7x7f7vrr0x&rid=giphy.gif", "https://media2.giphy.com/media/frGLgEcRWD5nvGeLDZ/giphy.gif?cid=ecf05e47d584w6md25s8jsxy95t2mvbdjvmdmo7x7f7vrr0x&rid=giphy.gif", "https://giphy.com/gifs/studiosoriginals-8aM0z4EOqAgPZIYprz"];
        msg.channel.send(link[x]);
        break;

    case 'p':
    case 'picture':
        var options ={
                url: "http://results.dogpile.com/serp?qc=images&q="+((Mess.slice(1)).join(' ')),
                method: "GET",
                headers:{
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                }
        };

        request(options, function(error, response, responseBody){
                $ = cheerio.load(responseBody);

                var links = $(".image a.link");

                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

                msg.channel.send( urls[Math.floor(Math.random() * urls.length)]);
        });
        break;

case 'r/':
    case 'reddit':
         var options ={
                url: "https://reddit.com/r/"+((Mess.slice(1)).join('')),
                method: "GET",
                headers:{
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                }
        };

        request(options, function(error, response, responseBody){

                $ = cheerio.load(responseBody);
                var links = $('.ImageBox-image');

                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("src"));
                if (urls[0]){
                        msg.channel.send(urls[0]);
                }
                else
                        msg.reply("sorry no images retrieved");
        });
        break;

        case 'u/':
    case 'user':
         var options ={
                url: "https://reddit.com/user/"+((Mess.slice(1)).join('')),
                method: "GET",
                headers:{
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                }
        };

        request(options, function(error, response, responseBody){

                $ = cheerio.load(responseBody);
                var links = $('.y8HYJ-y_lTUHkQIc1mdCq _2INHSNB8V5eaWp4P0rY_mE','a.SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE');

                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
                msg.reply(urls);
                if (urls[0]){
                        msg.channel.send(urls[0]);
                }
                else
                        msg.reply("sorry no images retrieved");
        });
        break;

  }
}
});
