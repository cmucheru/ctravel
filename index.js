let express = require('express');
let app = express();
let fortune = require('./lib/fortune.js');

//set up handlesbars view engine
let handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

//routes
app.get('/',function(req,res){
        res.render('home');
});
app.get('/about', function(req,res){
     //let randomFortune = fortunes[Math.floor(Math.random()* fortunes.length)];
     res.render('about', {fortune: fortune.getFortune()});
});

//static middleware
app.use(express.static(__dirname + '/public'));

//custom 404 page
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//custom 500 page
app.use(function(err, req, next){
      console.log(err.stack);
      res.type('text/plain');
      res.status(500);
      res.send('500 - Server Error');
      //next();
});

app.listen(app.get('port'), function(){
    console.log(`Express started on http://localhost:` +
    app.get('port')+'; press Ctrl+C to terminate.');
});

//p37.