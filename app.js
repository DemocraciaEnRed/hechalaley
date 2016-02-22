var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

router.get('/', function(req, res) {
	res.send("Hello World!");
});

app.use(router);
app.use(bodyParser.json());

routes = require('./lib/bill/billRoutes')(app);

var databaseURL = 'mongodb://localhost/billtracker';
mongoose.connect(databaseURL, function(err, res) {
	if (err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to database ' + databaseURL);
		var portNumber = 3000;
		app.listen(portNumber, function() {
			console.log("BillTracker server running on http://localhost:" + portNumber);
		});
	}
});