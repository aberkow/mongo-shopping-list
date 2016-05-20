require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var itemRoutes = require('./routes/item');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', itemRoutes);
app.use('*', function(req, res){
  res.status(404).json({message: 'Not Found'});
});

app.listen(4000, 'localhost', function(){
  console.log('Express listening on 4000');
});

exports.app = app;
