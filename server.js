const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req, resp, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n',(er)=>{
    if (er)console.log(er);
  });
  next();
});
// this middleware puts up a maintenance page
app.use((req,resp,next)=>{
  resp.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/', (req, resp)=>{
  resp.render('home.hbs',{
    pageTitle: "Homepage for this site",
    welcomeMessage: "You are quite welcome to browse the information stored here.",
  })
});

app.get('/about',(req,resp)=>{
  resp.render('about.hbs',{
    pageTitle: "About Us",
  });
});

app.get('/bad',(req,resp)=>{
  resp.send({error:'there was an error'});
})


app.listen(3000,()=>{
  console.log("node.js server is running on port 3000")
});
