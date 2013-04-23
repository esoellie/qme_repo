
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();
var queue = require("./data/queue");

// all environments
app.set('port', process.env.PORT || 7777);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon2.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  res.render('index', { title: 'Pick a Restaurant', queue: queue });
});
//app.get('/users', user.list);
app.get('/:restaurant/new', function (req,res) {
	res.render('new', { title: req.params.restaurant });
});

app.del('/:restaurant', function (req, res) {
	queue[req.params.restaurant] = queue[req.params.restaurant].slice(1);
	res.redirect('/'+req.params.restaurant);
});

app.post('/:restaurant', function (req, res) {
	if (req.body.name !== '' && typeof parseInt(req.body.party,10) == "number") {
		queue[req.params.restaurant].push(req.body);
		queue[req.params.restaurant][queue[req.params.restaurant].length-1]["party"] = Math.floor(queue[req.params.restaurant][queue[req.params.restaurant].length-1]["party"]);
		d = new Date();
		time = d.getHours() + ":" + d.getMinutes();
		queue[req.params.restaurant][queue[req.params.restaurant].length-1]["time"] = time;
		res.redirect('/'+req.params.restaurant);
	}
	else {
		res.redirect('/'+req.params.restaurant);
	}
});

app.get('/:restaurant', function (req,res) {
	var restaurant = queue[req.params.restaurant];
	res.render('restaurant', { title: req.params.restaurant, restaurant: restaurant });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
