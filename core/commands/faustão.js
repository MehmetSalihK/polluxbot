const Discord = require('discord.js');
var gear = require("../gearbox.js");
var cmd = 'fausto';

var init = function (message,userDB,DB) {

//    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');
    try{


        var fausto=[
            "ERROOOU!",
            "TÁ PEGANDO FOGO BICHO!",
            "ESSA FERA AÍ MEU!",
            "OLOCO!",
            "ELE MORREU!",
            "ESSA FERA "+message.guild.member(message.author).displayName.toUpperCase()+" AQUI NO DOMINGÃO!",
            "QUEM SABE FAZ AO VIVO!",
            "VOCÊ DESTRUIU MEU OVO!",
            "NINGUÉM ACERTOU!",
            "É UM PAÍS DA EUROPA!",
            "ORRA MEU!",
            "CHURRASQUEIRA DE CONTROLE REMOTO!",
        ]

message.channel.createWebhook('Faustão',"http://static2.blastingnews.com/media/photogallery/2015/4/21/660x290/b_290x290/globo-fara-programa-para-revelar-novo-faustao_309513.jpg")
 .then(async w => {
    await w.edit("Faustão","https://abrilvejasp.files.wordpress.com/2016/12/faustao-popp.jpg?quality=70&strip=info&w=600")
    w.sendMessage(fausto[gear.randomize(0,11)])
    w.delete()
})
 .catch(console.error)
    }catch(e){console.log(e)}

}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};


