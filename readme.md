
# Building Codeial From Scratch
#### We create a very well folder structure so that everyone can find any file easily
#
# Scalable MVC structure
```
Directory -> Express -> Git -> Routers & Controllers -> view Engine
Partial & Layouts -> Static files -> MongoDB

```














## Settings up Directory Structure

Create file

    index.js

Now write below code 
    
    npm init
then fill the form and click ok 

#### Now next step Keeping our 'controller' , 'routers', and 'views' separate
    config
    controllers
    models
    routes
    views
    index.js
    package.json

## Starting Express 
    const express = require('express');
    const app =  express();
    const port = 8000;

    app.listen(port, function(err){
        if(err){
            console.log('error:', err);
        }
        console.log('server is running on port ' , port);
    })
#### We can also use 
    npx nodemon index.js 
#### To run server one-time
#### after that it update automatic after every save occurs
#
## Adding Git and NPM Starting
creating ```.gitignore```\
file  to ignore `node_modules` file\
so that this file not include when we write `git add .`\
Inside `.gitignore` file we write\
    `node_modules/`
#


## Setup the Express Routes 
So u can assume that a `Route` can handle direct url like 
```
/home
/about
/contact
```
Let us suppose if user want to go through some url like 
```
/users/
/users/profile/
/users/create/
```
Here we can see the `users` is the common then we handled it using `routes`\
we create `routes` like `user.js` which handle all these type of urls.
```
    ------------------------FOR EXAMPLE---------------------
main->index.js->
        app.use('/',require('/routes') );

routes->index.js -> 
                router.use('/users',require('./users'));
                    user.js->
                        -> router.get('/', userController.users);
                        -> router.get('/profile', userController.profile));
                        -> router.get('/create', userconteroller.create);
```
#### Create Routes Folder
##### Inside that Create a File `index.js` 
`index.js` is our entry point for all URL routes\
whenver we enter `routes` we always get in `index.js`\
and further it goes to different URL's.
```
routes-> index.js -> user.js
                  -> likes.js
                  -> post.js

```
#
### Inside routes->index.js
```
const express = require('express');
const router = express.Router(); 

module.export = router; // exporting router

```
if you see clearly in both index.js file we import `require('express')`\
this is just a instance of earlier used `require('express')`\


Now we need to tell `main-> index.js-> app` to use it.

#### Using express routers
```
main->index.js  

------------using middleware------------------
app.use('/', require('./routes/index'));


 ----------------we can also do ---------------------
const router = require('./routes/index');
app.use('/',router);

```
`app.use` is a middleware -> which access all mentions before server starts\
`require('./routes/index')` is import statement which we can use earlier like we import `express`
#
#
## Creating Controllers
Create a folder main->`controller`\
Inside that create a file `home_controller.js`

which looks like:-\
`main-> controller-> home_controller.js`
```
inside-> home_controller.js->

module.exports.home = function(req,res){  
    return res.end(('<h1>Express is up for codiel </h1>'));
}

----------------for refrence--------------------

module.exports.fucntionName = function(req,res){
    return --------------
}

```
In  `module.exports.home` of above code here `home` is function name\
Now we need to access this `home`(function) on routes
```
routes->index.js->

const homeController = require('../controllers/home_controller')

router.get('/',homeController.home); // we use home(function) 


```
Now if we run server , now the routing is working for `localhost:8000`

### Creating Another Controller 
Create new file in `controller` folder name it` users_controller.js`
`users_controller` will controller all the users when we use mongoDB

```
in users_controller.js ->

module.exports.profile = function(req,res){
    return res.end('<h1> user profile</h1>');
}

```
Now we need to create `routes` for this.\
Everytime we create `controller` we have to create `routes` for that.

Now we need to create file in `routes` name `usesr.js`\
which looks like `routes->usesr.js` 
```
Inside users.js->

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/profile', userController.profile);

module.exports = router;

```
Now we need to tell `main-> index.js` to use this `route`

If we go to `main->index.js` there we get access of `routes->index.js`which is another route \
So now we use this `routes (users.js)` in `routes->index.js`
```
inside routes->index.js->
router.use('/users', require('./users'));

------------for refrence----------------

router.use('/routerName', require('./routerFile'));

```
## Installing EJS and Setting up View Engine 
Run the command in Terminal `npm install ejs`

Now we need to tell `main->index.js` that we are using EJS as our View Engine
```
inside main->index.js->

app.set('view engine', 'ejs');
app.set('views', './views');


```
### Create a View for Home

Now for that create a file `home.ejs` inside `views` folder

```
<html>
    <head>
        <title>
            <%= title %>
        </title>
    </head>
    <body>
        <h1>
            codiel / <%= title%>
        </h1>
    </body>
</html>

```
Now we have to render this\
we now go to controller -> `home_controller`
```
Inside controllers-> home_controller->

module.exports.home = function(req,res){
    return res.render('home' ,{
        title : 'home', 
    });
}

```
#
#


# Partials in Views

#### Partials are views that are designed to be used from within other views.

But in our case we need to create partials for header and footer.\
So that we `dont have to copy whole code again and again`.


### Partials are created in `Views` folder 
So we need to create 2 partials for that:-\
## `_header.ejs`
## `_footer.ejs`
We add `(_)underscore` as a naming convention.\
Just to differetiate it with other views.

```
inside views-> _footer.ejs

<footer>
    Page footer
</footer>

------------------------------------------------------

inside views-> _header.ejs

<header>
    Page header
</header>

```
It will not automatic add to the ejs->other file\
we need to mention that where to use.

### For that we use :-
### `<%-include ('_header'); %>` 
### `<%-include ('_footer'); %>` 

We just replace these code with whole code of header and footer
#
#
# Creating Layouts 
#### This Embedded JavaScript file acts as the default layout for all server side views rendered by your app.

We need to use a library : `Express-ejs-layouts`

For that we need to install that using command `npm install express-ejs-layouts`\
After that create a file in `views.ejs` -> `layout.ejs`

### In `main-> index.js` 
```
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
```

### In `views-> layout.ejs`
```
<body>
    <!------------ this is partial------------------->
    <%- include ('_header') %>


        <%- body %>

            <!-- this is partial -->
            <%- include('_footer') %>
                <%- script %>
</body>

```
On above code `<%- body %>` is variable part of body which changes dynamically\
After that we can remove all the code of other ejs file as our `Layouts` is set \
So our code will look like this :-

```
views-> home.ejs

<h1>
    Codiel / <%= title%>
</h1>


```
Yes just like above code nothing else 

#
#
#
## Setting Up Static File access
Create folder -> `assets`\
Here we create ->\
-> `css(folder)`-> `style.css`  \
-> `script` folder\
-> 
```
main-> index.js
----------------------------------------

app.use(exress.static('./assets'));



views-> layout.ejs-> 
----------------------------------------
<link rel="stylesheet" href ="/css/layout.css">
```
On above `layout.ejs` code we just simply mention the css file ,\
as we mention the whole path in `index.js`
#
#

## Linking our MongoDb
First of all we need to install mongoose

`npm install mongoose `

create a file under `config`folder name `mongoose.js`

```
main-> index.js->
------------------------------------
const db = require('./config/mongoose')


config-> mongoose.js->
-------------------------------


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting MongoDb"));

db.once('open', function(){
    console.log('connected to database :: MongoDb')
});
module.exports = db;
```



#
#
#
#
#
#
#
#
#
##
#
#
#
##
#
#
#
##
#
#
#
##
#
#
#
##
#
#
#
##
#
#
#
##
#
#
#
#
