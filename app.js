DB = require('./lib/model');
FS = require('fs');
BASE_URL = "http://ks-stretch-goal.herokuapp.com/";
GA = require('./lib/ga');
GA.init("UA-40823195-1", BASE_URL);

var express = require('express')
var path = require('path');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

require('./routes/all')(app);

var server = require('http').createServer(app)

var port = process.env.PORT || 3000;
server.listen(port);

console.log("Listening port "+port);

