const Discord = require("discord.js")
var commands = {};
const fs = require('fs');
const path = require('path');
var cfg = require('../config.js');


const hook = new Discord.WebhookClient(cfg.coreHook.ID, cfg.coreHook.token);




function determine(msg){
    let query = msg.content.substr(msg.prefix.length).split(' ')[0];
    let aliases = JSON.parse(fs.readFileSync("./core/aliases.json", 'utf8'));

    let command;
    if (aliases[query]) command = aliases[query].toLowerCase();
    else command = query.toLowerCase();

    let path = ""
    let files = fs.readdirSync(__dirname + "/modules")


        for (i = 0; i < files.length; i++) {
            let filedir = __dirname + "/modules/" + files[i]

            let morefiles = fs.readdirSync(filedir)
                if (morefiles.indexOf(command + ".js") > -1) {


                    let pathTo = filedir + "/" + command + ".js";

                    let comm = require (pathTo)

                    return {
                        path:pathTo,
                        cat:comm.cat,
                        module:files[i]
                    }


                }
        }
                   return false

}

var checkModuleNEW = function checkModuleNEW(DTMN){
// DTMN = [PATH, CAT, MODULE]
    return DTMN.module
}
var checkCategoryNEW = function checkCategoryNEW(DTMN){
// DTMN = [PATH, CAT, MODULE]
    return DTMN.cat
}
var checkUseNEW = function checkUseNEW(DTMN,DB,msg){
// DTMN = [PATH, CAT, MODULE]
    try {
        let commandFile = require(DTMN.path);
        switch (true) {
            case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cat):
            case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(DTMN.module):
            case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cmd):
                return "DISABLED";
                break;
            case msg.author.PLXpems > commandFile.perms:
                return "NO ELEVATION";
                break;
            default:
                return true;
                break;
        }
    } catch (err) {
        // console.log((err.stack).red)
    }
}

var run = function run(file,message,userDB,DB){

    try{
            let command = require(file)
            let commandname = message.content.split(" ")[0]
          command.init(message, userDB, DB);

        console.log(("  --== " + commandname.toUpperCase() + " ==--   ").bgMagenta.yellow.bold)
    }catch(e){
        console.log(e);
    }
}




//MDLE -- returns module
var checkModule = function (msg) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];
        if (msg.content.startsWith("p!")){
        let command = msg.content.substr("p!".length).split(' ')[0];

        }
        let commandFile = require(`./commands/${command}.js`);
        return commandFile.mod;

    } catch (err) {}
}
//USBT -- returns usability
var checkUse = function (msg, DB, userDB) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];

        let commandFile = require(`./commands/${command}.js`);

        switch (true) {

            case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cat):
            case DB.get(msg.guild.id).channels[msg.channel.id].modules.DISABLED.includes(commandFile.cmd):
                return "DISABLED";
                break;
            case msg.author.PLXpems > commandFile.perms:
                return "NO PRIVILEGE";
                break;
            default:
                return true;
                break;
        }

    } catch (err) {
        // console.log((err.stack).red)

    }

}

var deploy = function (message, userDB, DB) {


    var bot = message.botUser
    var command = message.content.substr(DB.get(message.guild.id).modules.PREFIX.length).split(' ')[0]
    let commandFile;
    try {
        if (!DB.get(message.guild.id).modules) {
            DB.get(message.guild.id).modules.GOODNAME = "Ruby"
        }
        switch (true) {

            case command == "🇸🇪":
                 commandFile = require(`./commands/menesueco.js`);
                break;
            case command == "$":
            case command == "ruby":
            case command == "rubys":
                commandFile = require(`./commands/cash.js`);
                break;
            case command == DB.get(message.guild.id).modules.GOODNAME.toLowerCase() + 'rank':
                commandFile = require(`./commands/cashrank.js`);
                break;
            case command == 'incinerate':
                commandFile = require(`./commands/clear.js`);
                break;

            default:
                try {
                    delete require.cache[require.resolve(`./commands/${command}.js`)];
                    commandFile = require(`./commands/${command}.js`);
                } catch (err) {
                 console.log((err.stack).red)
                }
                break;

        }
try{
if(message.channel.name.includes("secret")&&
    (message.author.id == "295998781126737930"|| //neptune
   message.author.id == "312955521873346570"|| //kuroi
   message.author.id == "238975494047924224"|| // delta
   message.author.id == "272082466926231552") //zema
  // message.user.id == "272082466926231552"|| //rani
  ){


   let castle = bot.guilds.get("277391723322408960");

   castle.channels.get("338742725568364546").send(`**${message.guild.name}** #${message.channel.name} - **${message.author.tag}:**  ${message.content}  `)
   }
  } catch (err) {console.log(err)}
      //  hook.send(`**${message.guild.name}** #${message.channel.name} - **${message.author.tag}:**  ${message.content}  `)




        commandFile.init(message, userDB, DB);




        console.log(("  --== " + command.toUpperCase() + " ==--   ").bgMagenta.yellow.bold)
  } catch (err) {
    }

};

var pullComms = function () {
    return commands;
};


var pushComms = function (t) {
    commands = t;
};




var checkPerms = function (msg) {

    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];
        let commandFile = require(`./commands/${command}.js`);
        return commandFile.perms;

    } catch (err) {}
}



var commCheck = function (msg, userDB, DB) {
    try {
        let command = msg.content.substr(msg.prefix.length).split(' ')[0];

        commands[command].init(msg, userDB, DB);
    } catch (err) {}
};



module.exports = {
    commCheck: commCheck,
  //  run: deploy,
    pullComms: pullComms,
    pushComms: pushComms,
    checkModule: checkModule,
    checkPerms: checkPerms,
    checkUse: checkUse,
    //4.0
    determine: determine,
    checkModuleNEW: checkModuleNEW,
    checkCategoryNEW: checkCategoryNEW,
    checkUseNEW: checkUseNEW,
    run:run
};
