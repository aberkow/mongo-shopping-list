var Item = require('../models/item');

//relies on model.js api from mongoose.js bc Item is based on
//var Item = mongoose.model('Item', ItemSchema); from models/item.js

//Model.create
exports.save = function(name, callback, errback){
  Item.create({name: name }, function(err, item){
    if (err) {
      errback(err);
      return;
    }
    console.log('log from services');
    callback(item);
    console.log('log from services again');
  });
};

//Model.find
exports.list = function(callback, errback) {
  Item.find(function(err, items){
    if (err) {
      errback(err);
      return;
    }
    callback(items);
  });
};

//model.findOneAndUpdate

//Model.remove
exports.delete = function(id, callback, errback){
  Item.findOneAndRemove({id: id}, function(err, item){
      if (err){
        errback(err);
        return;
      }
      callback(item);
  });
};
