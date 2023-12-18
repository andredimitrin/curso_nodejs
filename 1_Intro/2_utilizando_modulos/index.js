const fs = require('fs'); // importação do módulo fs (file system)

fs.readFile('arquivo.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err); 
        return;      
    }
    console.log(data);
})