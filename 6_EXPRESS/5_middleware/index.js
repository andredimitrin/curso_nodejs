const express = require('express');
const app = express();
const port = 3000; //vaariavel de ambiente
const path = require('path');

const basePath = path.join(__dirname, 'templates')

const checkAuth = function(req, res, next) {
    req.authStatus = true
    
    if(req.authStatus) {
        console.log('Esta autenticado')
    } else {
        console.log('Não esta autenticado')
    }
    next();
}

app.use(checkAuth);


app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    
    console.log(`App rodando na porta ${port}`);
})

