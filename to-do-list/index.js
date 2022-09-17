const express = require('express');

app = express();

port = 8000;

app.use('/', require('./routes/index.js')) // using routes

app.set('view engine', 'ejs'); //we have set template view as ejs
app.set('views', 'views'); // set the path for template view

app.listen(port, () => {
    console.log('app is running on the ' + port);
})