const express = require('express');
const app = express();
const port = 3000; //vaariavel de ambiente
const path = require('path');

const basePath = path.join(__dirname, 'templates')

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    //leitura da tabela users, resgatar o user com o id informado
    console.log(`Estamos buscando o usuário ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {    
    console.log(`App rodando na porta ${port}`);
})

