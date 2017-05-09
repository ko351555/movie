
var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var model = require('../webserver/routes/movieschema.js');
var modelStub = sinon.stub(model, 'find');

var app = require('../popat.js');
var address = request("http://localhost:8080")

describe('Test my controller', function(){

 describe('movies', function(){
   this.timeout(15000);
   beforeEach(function(){
     modelStub.yields(null, [{'Title': 'Theri', 'Year': '2016','Poster':'https://goo.gl/eQr707', 'imdbID':'tt5440700', 'comments':'nice'}]);
   });

   it('should attempt to find movies', function(done){
     setTimeout(done,15000);
     address
     .get('/stream/display')
     .expect(200)
     .expect('Content-Type', /json/)
     .end(function(err, res){
       if (err) return done(err);
       expect(res.body[0].Year).to.be.equal("2016");
       done();
     });
   });
 });
});