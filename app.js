const express  = require('express')
const app = express()
const PORT = 3000
const routers = require('./routers')
const session = require('express-session')

app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(session({
    secret: 'chngchjtfhjfy65',
    resave: false,
    saveUninitialized: true
}))
app.use('/', routers)

app.listen(PORT, () => {
    console.log('I love u ', 3000, new Date())
})