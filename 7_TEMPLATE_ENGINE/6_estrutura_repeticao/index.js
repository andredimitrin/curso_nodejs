const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

    const items = [
        'Item 1',
        'Item 2',
        'Item 3',
    ]

    res.render('dashboard',{items})
})

app.get('/', (req, res) => {

    const user ={
        name: 'André',
        surname: 'Dimitrin',
        age:36,
    }

    const palavra = 'teste'
    
    const auth = true

    const approved = true

    res.render('home', {user: user, palavra, auth, approved})
})

app.listen(3000,() => {
    console.log('App funcionando!')
})