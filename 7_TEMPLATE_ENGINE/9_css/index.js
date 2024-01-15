const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({

    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/dashboard', (req, res) => {

    const items = [
        'Item 1',
        'Item 2',
        'Item 3',
    ]

    res.render('dashboard',{items})
})

app.get('/post', (req, res) => {
    const post ={
        title: 'Aprender NodeJS',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a aprender NodeJS...',
        comments: 4,
    }

    res.render('blogpost', {post})
})

app.get('/blog', (req, res) => {
    
    const posts = [
        {
            title: 'Aprender NodeJS',
            category: 'JavaScript',
            body: 'Este artigo vai te ajudar a aprender NodeJS...',
            comments: 4,
        },
        {
            title: 'Aprender PHP',
            category: 'PHP',
            body: 'Este artigo vai te ajudar a aprender PHP...',
            comments: 6,
        },
        {
            title: 'Aprender SQL',
            category: 'SQL',
            body: 'Este artigo vai te ajudar a aprender SQL...',
            comments: 2,
        },

        

    ]
      
    res.render('blog', {posts})
        
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