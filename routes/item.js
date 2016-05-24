var express = require('express');
var Item = require('../services/item');
var router = express.Router();

router.get('/items', function(req, res){
  Item.list(function(items){
    res.json(items);
  }, function(err){
    res.status(400).json(err);
  });
});

router.post('/items', function(req, res){
  Item.save(req.body.name, function(item){
    console.log('log from routes ' + req.body.name + ' ' + req.body._id);
    debugger;
    res.status(201).json(item);
  }, function(err){
    res.status(400).json(err);
  });
});

router.put('/items/:id', function(req, res){
  Item.update(req.params.id, req.body.name, function(item){
    res.status(200).json(item);
  }, function(err){
    res.status(400).json(err);
  });
});

//needed to use req.params.id! to get the right id to show up. still isn't deleting, but closer.
router.delete('/items/:id', function(req, res){
  Item.delete(req.params.id, function(item){
    console.log('log from routes - delete', req.params.id);
    res.status(200).json(item);
    debugger;
  }, function(err){
    res.status(404).json(err);
  });
});


module.exports = router;
