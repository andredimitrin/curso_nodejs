const express = require('express');
const router = express.Router();
const path = require('path');

const basePath = path.join(__dirname, '../templates');

router.get('/add', (req, res) => {
    res.sendFile(path.join(basePath, 'userForm.html'));
});

router.post('/save', (req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const age = req.body.age;

    res.send(`O nome do usuário é ${name} e ele tem ${age} anos`);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    // leitura da tabela users, resgatar o user com o id informado

    console.log(`Estamos buscando o usuário ${id}`);
});

module.exports = router;
