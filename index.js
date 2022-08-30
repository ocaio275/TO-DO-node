const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()


/** Insirir Configurações */

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use(
    session({
        name:"session",
        secret: "", //Criar secret key
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function (){},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now + 3600000),
            httpOnly: true
        }
    })
)


app.use(flash())


app.use(express.static('Public'))