const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}; ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log +'\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    homeBody: 'Some home page relevant text here'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    projectBody: 'Some projects related text here'
  });
});

// bad
// simulate when something goes bad
// send back json with errorMessage

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Something bad happened'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}` );
});
