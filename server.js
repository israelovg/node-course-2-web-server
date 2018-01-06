const fs = require('fs');
const express = require('express');
const port = process.env.PORT || 3000;
var app = express();
const hbs = require('hbs'); //hbs is html template rendering like in php 
app.set('view engine', 'hbs'); //tells to express what html rendering to use

//here we register partial views
hbs.registerPartials(__dirname + '/views/partials');

//express middleware is like httpModule oin asp.net , its prossess all requests that comes to express, its get  arrow function with 3 parametes ,request,esponse,next
app.use((req, res, next) => {
    var log = `${new Date().toString()} ${req.method} ${req.url} \n`;
    fs.appendFile('server.log',
        log,
        (error) => {
            console.log('error occured on logging to file');
        });
    next(); // next say to express go forward 
});
//this express middleware will return maintenance.hbs for all requests
//app.use((req, res, next) => {
//    res.render('maintenance.hbs',
//        {
//            pageTitle: 'Maintenance Page',
//            currentYear: new Date().getFullYear()
//        });
//});
//register helper , we can use it as method in template
hbs.registerHelper('getCurrentYear',
    () => {
        return new Date().getFullYear();
    });
hbs.registerHelper('screamIt',
    (text) => {
        return text.toUpperCase();
    });

// to make some directory that can be  viewed , use this way
// to get the file in url , it should be like - /help.html
app.use(express.static(__dirname + '/public'));
//get function use as http handler
//for instanse get to the root of appliction is /
// the second argument is callback that have 2 parameters, request and response
app.get('/about', (req, res) => {

    //for send data as response we use response.send
    //by default express sent data with html/text content type

    /*   
      res.send('<h1>About Page</h1>');  
    */
    res.render('about.hbs',
        {
            pageTitle: 'About Page',
            currentYear: new Date().getFullYear()
        });
});
app.get('/projects', (req, res) => {
    res.render('projects.hbs',
        {
            pageTitle: 'Projects',
            currentYear: new Date().getFullYear()
        });
});

app.get('/',
    (req, res) => {

        //this send json response with contentType text/json
        /*
        res.send({
            name: 'Gabi Israeli',
            like: ['sport', 'traveling']
        });
        */

        res.render('home.hbs',
            {
                pageTitle: 'Home Page',
                currentYear: new Date().getFullYear(),
                wellcomeMessage: 'Hello visitor! Its Gabi new site.'
            });
    });
app.get('/bad',
    (req, res) => {
        res.send({ errorMessage: 'Unable to fullfill the request!' });
    });
app.listen(port,() => {
    console.log(`Server set up on port ${port}`);
});