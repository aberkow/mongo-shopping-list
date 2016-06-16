var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test'; //set to test so that it doesn't use dev or prod db's
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function(){
  //add items from the seed file 'before' testing
  before(function(done){
    seed.run(function(){
      done();
    });
  });
  it('should list items on GET', function(done){
    chai.request(app)
        .get('/items')
        .end(function(err, res){
          res.should.have.status(200); //this works though...
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length(3);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('name');
          res.body[0]._id.should.be.a('string');
          console.log(res.body[0]._id);
          res.body[0].name.should.be.a('string');
          res.body[0].name.should.equal('Broad beans');
          res.body[1].name.should.equal('Tomatoes');
          res.body[2].name.should.equal('Peppers');
          done();
        });
  });
  // it('should list an individual item on GET by id', function(done){
  //   chai.request(app)
  //       .get('/items/' + Item._id)
  //       .end(function(err, res){
  //         console.log(res.body);
  //         res.should.have.status(200);
  //         res.should.be.json;
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('_id');
  //         res.body.should.have.property('name');
  //         res.body._id.should.be.a('string');
  //         res.body.name.should.be.a('string');
  //         res.body.name.should.equal('Broad beans');
  //         done();
  //       });
  // });
  //
  it('should add an item on POST', function(done){
    chai.request(app)
        .post('/items')
        .send({'name': 'Kale'})
        .end(function(err, res){
          console.log(res.body);
          should.equal(err, null);
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('_id');
          res.body.name.should.be.a('string');
          res.body._id.should.be.a('string');
          res.body.name.should.equal('Kale');
          done();

        });
        //needed to break out the test for the full list into a new chai.request.
    chai.request(app)
        .get('/items')
        .end(function(err, res){
          res.body.should.have.length(4);
          res.body[3].should.be.a('object');
          res.body[3].should.have.property('id');
          res.body[3].should.have.property('name');
          res.body[3]._id.should.be.a('number');
          res.body[3].name.should.be.a('string');
          res.body[3].name.should.equal('Kale');
          done();
        });
  });
  // //follow up here. something about this doesn't seem right even though it works.
  it('should edit an item on PUT', function(done){

    Item.find({name: 'Peppers'}, function(err, item){
      var id = item[0][id];
      chai.request(app)
      .put('/items/' + id)
      .send({'name': 'apple'})
      .end(function(err, res){
        // res.should.have.status(400);
        // res.body.should.be.json;
        console.log('put', res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('_id');
        res.body.name.should.be.a('string');
        res.body._id.should.be.a('string');
        res.body.name.should.equal('apple');
        console.log("put request " + res.body.name);
        done();
      });
    });
  });
it('should delete an item on DELETE', function(done){
  Item.find({name: 'Tomatoes'}, function(err, item){
    var id = item[0][id];
    chai.request(app)
    .delete('/items/' + id)
    .end(function(err, res){
      console.log('delete', res.body);
    });
  });
});
  // it('should return 404 if you DELETE an item that doesn\'t exist', function(done){
  //   chai.request(app)
  //       .delete('/items/99')
  //       .end(function(err, res){
  //         res.should.have.status(404);
  //         done();
  //       });
  //     });
  //remove all items from the test db
  after(function(done){
    Item.remove(function(){
      done();
    });
  });
});
