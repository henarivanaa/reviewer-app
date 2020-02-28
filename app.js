const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const session = require('express-session')

// init ejs
app.set('view engine', 'ejs')

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// session
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true
}))

// define routes
const routes = require('./routes')
app.use(routes)

app.listen(port, () => console.log(`listening on port:${port}`))