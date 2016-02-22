var express = require("express"),  
    app = express(),
    mongoose = require('mongoose');


var router = express.Router();

router.get('/', function(req, res) {  
   res.send("Hello World!");
});

app.use(router);

app.listen(3000, function() {  
  console.log("Hola viteh on http://localhost:3000");
});