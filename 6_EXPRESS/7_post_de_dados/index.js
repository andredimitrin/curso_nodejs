const express = require('express');
const app = express();
const port = 3000; //vaariavel de ambiente
const path = require('path');

const basePath = path.join(__dirname, 'templates')

//ler o body do req

app.use(
    express.urlencoded({extended: true})
)

app.use(express.json())


app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userForm.html`)
})

app.post('/users/save', (req, res) => {    
    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    res.send(`O nome do usuário é ${name} e ele tem ${age} anos`)
    
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    //leitura da tabela users, resgatar o user com o id informado

    console.log(`Estamos buscando o usuário ${id}`)
})


app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {    
    console.log(`App rodando na porta ${port}`);
})

