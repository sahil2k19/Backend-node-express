const express = require('express');

// cookieparser
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

// database
const db = require('./config/mongoose');

// express layouts
const expressLayouts = require('express-ejs-layouts');

// sass Middleware
const sassMiddleware = require('node-sass-middleware');

// used for session cookies 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


// for express layouts
app.use(expressLayouts);
// extracts style and scripts from sum pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// for sass
app.use(sassMiddleware({
    src: '/assets/sc',
}))


// for cookie parser
app.use(cookieParser()); // setting cookie parser

//reading through post request 
app.use(express.urlencoded({ extended: false }));

// for sessions
app.use(session({
    name: 'codeial',
    // todo change the secret before deplayment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100), // cookie expiry-time
    }
}))

//for passport
app.use(passport.initialize());
app.use(passport.session());


// setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');


// using routes
app.use('/', require('./routes/index.js'))


app.listen(port, (err) => {
    if (err) {
        console.log(`error in running the server: ${err}`);
    }
    console.log('app is running on the ' + port);
})                      