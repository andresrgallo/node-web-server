//Section 5 lecture 41
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//partials
hbs.registerPartials(__dirname +'/views/partials')
app.set('view engine', 'hbs')

//app.use registers a middleware action
//store date in a file
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = (`${now}: ${req.method}, ${req.url}`);
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
})
// maintenace page
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })
//has to be below of maintenance as express registers from top to bottom
app.use(express.static(__dirname + '/public'));



//helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
// helper for uppercase
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: "Welcome to my Page"
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        message: "About us"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to connect to page'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});