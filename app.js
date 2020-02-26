const express = require('express')
const app = express()
const port = 3000

// init ejs
app.set('view engine', 'ejs')

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// define routes
const routes = require('./routes')
app.use(routes)

app.listen(port, () => console.log(`listening on port:${port}`))