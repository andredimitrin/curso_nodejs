const fs = require('fs')

console.log('Iniciando...');

fs.writeFile('arquivo.txt', 'Assincrono', function(err){
    setTimeout(function(){
        console.log('Arquivo criado');
    }, 4000);
});

console.log('Fim')