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
    callback(item);
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

//model.update
//_id is the query. This finds the item.
// exports.update = function(id, newName, callback, errback){
//   Item.findOneAndUpdate({_id: id}, {$set: {name: newName}}, {new: true}, function(err, item){
//     if (err) {
//       errback(err);
//       return;
//     }
//     console.log('services ', newName);
//     callback(item);
//   });
// };

exports.update = function(id, newName, callback, errback){
  Item.findByIdAndUpdate(id, {name: newName}, {new: true}, function(err, item){
    if (err) {
      errback(err);
      return;
    }
    callback(item);
  });
};

//Model.remove
// exports.delete = function(id, callback, errback){
//   Item.findByIdAndRemove(id, function(err, item){
//       if (err){
//         errback(err);
//         return;
//       }
//       console.log('services', item);
//       callback(item);
//       debugger;
//   });
// };

exports.delete = function(id, callback, errback){
  Item.findOneAndRemove({_id: id}, function(err, item){
      if (err) {
        errback(err);
        return;
      }
      callback(item);
  });
};
