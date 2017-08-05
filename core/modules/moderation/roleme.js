
var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'roleme';

var init = function (message, userDB, DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.toLowerCase().split(' ').slice(1)[0]
    var argsV = MSG.toLowerCase().split(' ').slice(1)[1]

    var LANG = message.lang;
    //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (message.content.split(" ")[1]==helpkey || message.content.split(" ")[1]=="?"|| message.content.split(" ")[1]=="help"){
    return gear.usage(cmd,message,this.cat);
}
//------------

    function ifEmpty() {

        var kek = require("./autorole.js")
        var clone = message
        clone.content = "+autorole list"
        return kek.init(clone, userDB, DB)
    }


    //-------MAGIC----------------

    Target = Server.member(Target)
    console.log(args)
    if (args === "help" || args === "" || args === undefined) {

        return ifEmpty()
    }

    var mem = Member

    //--------------------------------------

    var AUTROLS = DB.get(Server.id).modules.AUTOROLES

    var On = gear.emoji("check")
    var Off = gear.emoji("xmark")

    var rolenotfound = mm('CMD.nosuchrole', {
        lngs: LANG
    });

    //--------------------------------------

    var noPermsMe = mm('CMD.unperm', {
        lngs: LANG
    })

    if (args === "out") {
        var argum = MSG.substr((message.prefix + " out" + cmd).length + 1)


        for (var i = 0; i < AUTROLS.length; i++) {

            if (AUTROLS[i][1] == argum) {
                return xR(argum, Server.member(Author))
            }

        }
        message.reply(rolenotfound).catch(e=>gear.sendDebug(message))



    } else {
        var argum = MSG.substr((message.prefix + cmd).length + 1)

        for (var i = 0; i < AUTROLS.length; i++) {

            if (AUTROLS[i][1] == argum) {
                return fR(argum, Server.member(Author))
            }

        }
        message.reply(rolenotfound).catch(e=>gear.sendDebug(message))

    }


    function fR(role, memb) {

        var roleadd_confirm = On + mm('CMD.roleadCom', {
            lngs: LANG,
            user: memb.displayName,
            group: role
        });

        var a = Server.roles.find('name', role);
        memb.addRole(a).then(a => message.channel.send(roleadd_confirm)).then(e => e.delete(5000)).catch(e => message.channel.send(noPermsMe).catch(e=>gear.sendDebug(message)))
        message.delete(5000).catch(e=> {let a = (new Error); gear.errLog(e,__filename,a.stack.toString())})
    }

    function xR(role, memb) {


        var roleremove_confirm = Off + mm('CMD.rolermCom', {
            lngs: LANG,
            user: memb.displayName,
            group: role
        });

        var a = Server.roles.find('name', role);
        memb.removeRole(a).then(a => message.channel.send(roleremove_confirm)).then(e => e.delete(5000)).catch(e => message.channel.send(noPermsMe).catch(e=>gear.sendDebug(message)))
           message.delete(5000).catch(e=>gear.sendDebug(message))
    }
}
module.exports = {
    pub: false,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'community'
};
